const BASE_URL = 'http://localhost:8080'
export const GetAllEmployee = async(search='', page = 1, limit = 5) =>{
    const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
    try {
        const options = {
            method: 'GET',
            'Content-Type' : 'application/json'
        }
        const result = await fetch(url,options)
        const data = await result.json()
        return data
    }
    catch(err)
    {
        return err;
    }
}

export const GetEmployeeDetailsById = async (id) => {
    const url =
        `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const { data } = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}

export const CreateEmployee = async(empObj) =>{
    const url = `${BASE_URL}/api/employees`;
    try {
        const formData = new FormData()

        for(const key in empObj){
            formData.append(key, empObj[key])
        }
        const options = {
            method: 'POST',
            // 'Content-Type' : 'application/json',
            body: formData
        }
        const result = await fetch(url, options);
        if (!result.ok) {
            // Handle HTTP errors
            const errorMessage = await result.text(); // Get error message from the response
            throw new Error(`Server Error: ${errorMessage}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Failed to add employee:', err.message);
        return { success: false, message: err.message }; // Return an error response
    }
};

export const updateEmployeeById = async(empObj, id) =>{
    const url = `${BASE_URL}/api/employees/${id}`;
    try {
        const formData = new FormData()

        for(const key in empObj){
            formData.append(key, empObj[key])
        }
        const options = {
            method: 'PUT',
            // 'Content-Type' : 'application/json',
            body: formData
        }
        const result = await fetch(url, options);
        if (!result.ok) {
            // Handle HTTP errors
            const errorMessage = await result.text(); // Get error message from the response
            throw new Error(`Server Error: ${errorMessage}`);
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Failed to add employee:', err.message);
        return { success: false, message: err.message }; // Return an error response
    }
};

export const DeleteEmployeeById = async (id) => {
    const url =
        `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}


