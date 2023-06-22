const getState = ({ getStore, getActions, setStore }) => {


	return {
		store: {
			token: null,
			user: {}
		},
		actions: {

			getNewUser: (email, password) => {
				const store = getStore();

				let newUser = {
					email: email,
					password: password,
				}

				fetch(process.env.BACKEND_URL + "/api/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newUser)
				})
					.then((response) => {
						if (!response.ok) {
							alert("Login error, please go back & try again")
							throw new Error("Error HTTP: " + response.status)
						}
						return response.json()
					})
					.then(data => {
						setStore({ token: data.token, user: newUser });
						sessionStorage.setItem("token", data.token);
					})
					.catch(error => console.log(error));		
			},


			logInUser: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,
							password: password,
						})
					});

					if (response.status === 200) {
						const data = await response.json();
						setStore({ token: data.token, user: data.user });
						sessionStorage.setItem("token", data.token);
						
						return true;
					} else {
						alert("Login error, please go back & try again")
						return false;
					}
				} catch (error) {
					console.error("error", error);
					return false;
				}
			},

			logOutUser: () => {
				sessionStorage.removeItem("token")
				setStore({ token: null })
			},

			checkUser: () => {
				const store = getStore();
				const opts = {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + store.token
					}	
				};
				fetch(process.env.BACKEND_URL + "/api/private", opts)
					.then(response => {
						if (!response.ok) {
							throw new Error("Error HTTP: " + response.status);
						}
						return response.json();
					})
					.then(data => setStore({ token: data.token }))
					.catch(error => console.log("Error", error));
			},

		}
	}
}


export default getState;



