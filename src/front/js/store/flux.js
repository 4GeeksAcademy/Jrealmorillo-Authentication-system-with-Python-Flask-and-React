const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,

			user: { 
				email: "", 
				password: "" 
			},

			users: [],
		
				
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},



			getNewUser: (email, password) => {

				const newUser = {
					email: email,
					password: password
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
						throw new Error("Error HTTP: " + response.status)
					}
					return response.json()
					})
				.then(data => {
					
					setStore({ user: { email: data.user.email, password: data.user.password } });
				} )
				.catch(error => console.log(error))
			},

			checkUser: (email, password) => {

				const user = {
					email: email,
					password: password
				}

				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(user)
				})
				.then((response) => {
					if(!response.ok) {
						throw new Error("Error HTTP: " + response.status)
					}
					return response.json()
				})
				.then(data => {
					setStore({ user: {email: data.user.mail, password: data.user.password}});
				})
				.catch(error => console.log(error))
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;



			// getMessage: async () => {
			// 	try{
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	}catch(error){
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },