const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			current_user: null,
			access_token: null
		},

		actions: {
			signup : async (email, password) => {
				try {
					const answer = await fetch(process.env.BACKEND_URL + "api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"email" : email,
							"password" : password,
							"is_active" : true
						})
					})
					if (answer.status!=201) {
						alert("something went wrong!")
						return false
					}
					const data = await answer.json()
					console.log(data)
					sessionStorage.setItem("current_user", data)
					setStore({ current_user : data})
					console.log(current_user)
					return true
				} catch (error) { console.error("an issue has been found", error) }
			},

			login: async (email, password) => {
				try {
					const answer = await(process.env.BACKEND_URL + "api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							},
						body: JSON.stringify({
							email: email,
							password: password
					})
				})
				if (answer.status!=200) {
					alert("invalid email or password")
					return false
				}
				const data = await answer.json()
				sessionStorage.setItem("access_token", data.access_token)
				sessionStorage.setItem("current_user", email)
				setStore({ access_token : data.access_token })
				setStore({ current_user : data })
				console.log(current_user)
				return true
				}
				catch(error) { console.error("an issue has been found", error) }
			},

			logout: () => {
                sessionStorage.removeItem("access_token")
				sessionStorage.removeItem("current_user")
				setStore({access_token: null})
				setStore({current_user: null})
            },
		}
	};
};

export default getState;