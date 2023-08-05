const getState = ({ getStore, getActions, setStore }) => {


	return {
		store: {
			user: {
				email: "",
				token: null,
				id: "",

			},
		},
		actions: {

			userSignup: async (email, password) => {
				try {
					const newUser = {
						email: email,
						password: password,
					};

					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(newUser),
					});

					if (!response.ok) {
						throw new Error("Error creating user");
					}

					const data = await response.json();
					return true;
				} catch (error) {
					console.log("Error creating user", error);
					return false;
				}
			},


			userLogin: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer" + sessionStorage.getItem("token")
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					})
					if (response.status !== 200) {
						throw new Error("Error en la solicitud de inicio de sesión");
					}
					const data = await response.json()
					console.log("data", data)
					sessionStorage.setItem("email", data.email);
					sessionStorage.setItem("token", data.token);
					sessionStorage.setItem("id", data.id);
					setStore({
						user: {
							email: data.email,
							token: data.token,
							id: data.id,
						}
					})
					return data;
				} catch (error) {
					console.log("Error logging in user", error);
					throw error;
				}
			},


			userLogOut: () => {
				sessionStorage.removeItem("token");
				setStore({
					user: {
						email: "",
						token: null,
						id: ""
					}
				})
			},

			keepStoredData: () => {
				const storedToken = sessionStorage.getItem("token");
				const storedEmail = sessionStorage.getItem("email");
				const storedId = sessionStorage.getItem("id");
				if (storedToken) {
					setStore({
						user: {
							id: storedId,
							token: storedToken,
							email: storedEmail,
						}
					});
				}
			},

			// 	checkUser: () => {
			// 		const store = getStore();
			// 		const opts = {
			// 			method: "GET",
			// 			headers: {
			// 				"Authorization": "Bearer " + store.token
			// 			}
			// 		};
			// 		fetch(process.env.BACKEND_URL + "/api/private", opts)
			// 			.then(response => {
			// 				if (!response.ok) {
			// 					throw new Error("Error HTTP: " + response.status);
			// 				}
			// 				return response.json();
			// 			})
			// 			.then(data => setStore({ token: data.token }))
			// 			.catch(error => console.log("Error", error));
			// 	},

			// }
		}
	}
}


export default getState;



