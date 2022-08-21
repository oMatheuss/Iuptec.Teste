import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';

@Injectable()
export class ApiService {

    api: AxiosInstance;
    jwtToken: string | undefined;
    decodedToken: { [key: string]: string; } | undefined;
	isLogged: boolean = false;

    constructor() {
        this.api = axios.create({
            baseURL: environment.apiurl,
            withCredentials: true,
        });
    }

    tryLogin(email: string, senha: string): Promise<any> {
        return new Promise(resolve => { 
            this.api.post('/login', {email, senha}).then(({ data }) => {
                if (data.success) {
					this.isLogged = true;
                    this.jwtToken = data.output.token;
                    resolve(data);
                } else {
                    resolve(data);
                }
            });
        });
    }

	postCadastro(
		nome: string, email: string,
		senha: string, telefone: string): Promise<any> {
        return new Promise(resolve => { 
            this.api.post('/signup', {nome, email, senha, telefone})
			.then(
				({ data }) => {
					resolve(data);
            	}
			);
        });
    }

    async getMe(): Promise<any> {
        if (!(await this.validateToken())) {
            return new Promise(resolve => {
                resolve({success: false})
            });
        }

        return new Promise(resolve => {
            this.api.get('/user/me', {
                headers: {
                    'Authorization': `Bearer ${this.jwtToken}`  
                }
            }).then(({ data }) => {
                resolve(data);
            });
        });
    }

    async getMeusVeiculos(): Promise<any> {
        if (!(await this.validateToken())) {
            return new Promise(resolve => {
                resolve({success: false})
            });
        }

        return new Promise(resolve => {
            this.api.get('/user_veic', {
                headers: {
                    'Authorization': `Bearer ${this.jwtToken}`  
                }
            }).then(({ data }) => {
                resolve(data);
            });
        });
    }

	async getVeiculos(): Promise<any> {
        if (!(await this.validateToken())) {
            return new Promise(resolve => {
                resolve({success: false})
            });
        }

        return new Promise(resolve => {
            this.api.get('/veic', {
                headers: {
                    'Authorization': `Bearer ${this.jwtToken}`  
                }
            }).then(({ data }) => {
                resolve(data);
            });
        });
    }

	async adicionaMeuVeiculo(id_veiculo: number, placa: string): Promise<any> {
		if (!(await this.validateToken())) {
            return new Promise(resolve => {
                resolve({success: false})
            });
        }

        return new Promise(resolve => { 
            this.api.post('/user_veic', {id_veiculo, placa}, {
				headers: {
                    'Authorization': `Bearer ${this.jwtToken}`  
                }
			}).then(({ data }) => {
				resolve(data);
            });
        });
    }

	async removeMeuVeiculo(id: number): Promise<any> {
		if (!(await this.validateToken())) {
            return new Promise(resolve => {
                resolve({success: false})
            });
        }

        return new Promise(resolve => { 
            this.api.delete('/user_veic', {
				params: {id},
				headers: {
                    'Authorization': `Bearer ${this.jwtToken}`  
                }
			}).then(({ data }) => {
				resolve(data);
            });
        });
    }

    async Logout(): Promise<any> {
        if (!(await this.validateToken())) {
            return new Promise(resolve => {
                resolve({success: false})
            });
        }

        return new Promise(resolve => {
            this.api.get('/logout', {
                headers: {
                    'Authorization': `Bearer ${this.jwtToken}`  
                }
            }).then(({ data }) => {
				this.isLogged = false;
                this.jwtToken = "";
                resolve(data);
            });
        });
    }

    async refreshToken(): Promise<boolean> {
        try {
            let {data} = await this.api.get('refreshtoken');
            if (data.success) {
				this.isLogged = true;
                this.jwtToken = data.output.token;
                return true;
            } else {
				this.isLogged = false;
                return false;
            }
        } catch(ex) {
            return Promise.reject("Erro na resposta da API.");
        }
    }

    async validateToken() {
        let valid = true;
        if (!this.jwtToken || this.isTokenExpired()) {
            valid = await this.refreshToken();
        }
        return valid;
    }

    decodeToken() {
        if (this.jwtToken) {
            this.decodedToken = jwtDecode(this.jwtToken);
        }
    }
  
    getDecodeToken() {
        if (this.jwtToken) {
            return jwtDecode(this.jwtToken);
        }
    }
  
    getExpiryTime() {
        this.decodeToken();
        return this.decodedToken ? parseInt(this.decodedToken['exp']) : null;
    }
  
    isTokenExpired(): boolean {
        const expiryTime: number | null = this.getExpiryTime();
        if (expiryTime) {
            return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
        } else {
            return false;
        }
    }
}