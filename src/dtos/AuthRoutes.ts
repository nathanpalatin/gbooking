export type AuthRoutesTypes = {
	welcome: undefined
	signIn: undefined
	signUp: undefined
	aboutCompany:
		| undefined
		| {
				type: string
		  }
	localService:
		| undefined
		| {
				type: string
				businessName: string
				description: string
				phone: string
				code?: string
		  }
	pricing: undefined
	resetPassword: undefined
	forgetPassword: undefined
	completeAccount: undefined
}
