const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			current_user: null,
		},

		actions: {
			signup : (navigate) => {
				fetch(process.env.BACKEND_URL + "/api/signup", {
					method: POST,
					body: JSON.stringify(),
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(response => console.log(response))
				.then(data => {
					setStore({ current_user: data })
					navigate('/')
				})
				.catch((error) => alert(error));
			},

			login: ({ username, email, password }, navigate) => {
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify({
						username: username,
						email: email,
						password: password,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(response => response.json())
				.then((data) => {
					localStorage.setItem("access_token", data.access_token)
					navigate('/private')})
				.catch((error) => alert(error));
			},

			logout: () => {
                if (sessionStorage.getItem('current_user')) {
                    setStore({
                        current_user: null
                    })
                    sessionStorage.removeItem('current_user')
                }
            },
		}
	};
};

export default getState;