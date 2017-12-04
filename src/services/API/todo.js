export const requestAddTodo = (data) => {
    return new Promise((resolve, reject) => {
        let oldItem = JSON.parse(localStorage.getItem('item')) || [];
        oldItem.push(data);
        localStorage.setItem('item', JSON.stringify(oldItem));
        resolve();
    });
}

export const requestEditTodo = (index, data) => {
    return new Promise((resolve, reject) => {
        let oldItem = JSON.parse(localStorage.getItem('item'));
        oldItem[index]["title"] = data.title;
        oldItem[index]["location"] = data.location;
        oldItem[index]["description"] = data.description;
        localStorage.setItem('item', JSON.stringify(oldItem));
        resolve();
    });
}

export const requestDeleteTodo = (index) => {
    
    return new Promise((resolve, reject) => {
        let oldItem = JSON.parse(localStorage.getItem('item'));
        oldItem.splice(index, 1);
        localStorage.setItem('item', JSON.stringify(oldItem));
        resolve();
    });
}

export const requestGetTodoList = (listType) => {
    return new Promise((resolve, reject) => {
        const data = JSON.parse(localStorage.getItem('item')) || [];
        let newData = [];
        if(listType === 'complete') {
            for(let i=0; i<data.length; i++) {
                if(data[i].checked) {
                    newData.push(data[i]);
                }
            }
            resolve(newData);
        } else if(listType === 'incomplete') {
            for(let i=0; i<data.length; i++) {
                if(!data[i].checked) {
                    newData.push(data[i]);
                }
            }
            resolve(newData);
        } else {
            resolve(data);
        } 
        if(!data) {
            reject("데이터 없음");
        }
    });
}

export const requestToggleDone = (index) => {
    return new Promise((resolve, reject) => {
        let oldItem = JSON.parse(localStorage.getItem('item'));
        if(oldItem[index]["checked"] === true) {
            oldItem[index]["checked"] = false;
        } else {
            oldItem[index]["checked"] = true;
        }
        
        localStorage.setItem('item', JSON.stringify(oldItem));
        resolve();
    });
}

export const requestSearchTodo = (query) => {
    return new Promise((resolve, reject) => {
        const regx = new RegExp(query + '.*', "i");
        const data = JSON.parse(localStorage.getItem('item'));
        let newItem = [];

        for(let i=0; i<data.length; i++) {
            if(data[i].description.search(regx) !== -1) {
                newItem.push(data[i]);
            }
        }
        console.log(newItem);
        if(newItem.length > 0) {
            resolve(newItem);
        } else {
            reject("결과 없음");
        }
    });
}

