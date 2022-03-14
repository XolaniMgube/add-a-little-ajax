window.onload = function() {
    loadVisitors()
}

function loadVisitors() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/viewVisitors', true)

    xhr.onload = function() {
        if(this.status == 200) {
            const data = JSON.parse(this.responseText)

            const viewVisitors = document.getElementById("view-visitors")
            const table = document.querySelector('.table')
            const tableHeader = document.querySelector('.table-header')
            const tableBody = document.querySelector('.table-body')

            for (let i = 0; i < data.length; i++) {
                let newTable = tableBody.innerHTML += `
            <tr>
                <td>${data[i].visitor_id}</td>
                <td>${data[i].visitor_name}</td>
                <td>${data[i].visitor_age}</td>
                <td>${data[i].date_of_visit}</td>
                <td>${data[i].time_of_visit}</td>
                <td>${data[i].assisted_by}</td>
                <td>${data[i].comments}</td>
                <td><button class="${data[i].visitor_id} delete-button">Delete</button></td>  
            </tr>
            `
            }
        }
    }
    xhr.send()
}

setTimeout(function(){
    const deleteButton = document.querySelectorAll(".delete-button")
    for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', function() {
            const id = deleteButton[i].classList[0]

            function deletingVisitor() {
                const xhr = new XMLHttpRequest();
                xhr.open('DELETE', `/deleteVisitor/${id}`, true)

                xhr.onload = function() {
                    if(this.status == 200) {
                        let data = JSON.parse(this.responseText)
                    }
                }
                xhr.send()
            }
            deletingVisitor() 
        })
    }
}, 2000);