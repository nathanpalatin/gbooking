import { api } from './api'
import axios from 'axios'

export const login = async (credential: string, password: string) => {
	const res = await api.post('/api/accounts/auth/login', {
		userCredential: credential,
		userPassword: password
	})
	return res
}

export const registerBusiness = async (
	businessName: string,
	email: string,
	phone: string,
	description: string,
	address: string,
	type: string
) => {
	const res = await api.post('/api/business-profile/add', {
		businessName,
		description,
		address,
		phone,
		email,
		isActive: true,
		type
	})
	return res
}

export const registerUser = async (name: string, email: string, phone: string, password: string) => {
	const res = await api.post('/users', {
		name,
		email,
		phone,
		password
	})
	return res
}

export const loginGoogle = async (token: string) => {
	const res = await api.patch('/loginGoogle', {
		token
	})

	return res
}

export const getBusinessAddress = async (cep: string) => {
	const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
	return response
}
