window.onload = function() {
    loadVisitors()
    // update()
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
                <td><button class="${data[i].visitor_id} update-button">Update</button></td>  
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
            document.location.reload()
        })
        
    } 
    
}, 2000);

// setTimeout(function() {
//     let updateButton = document.querySelectorAll('.update-button')
//     for (let i = 0; i < updateButton.length; i++) {
//         updateButton[i].addEventListener('click', function() {
//             const id = updateButton[i].classList[0]
//             console.log(id)
//             function updateVisitor() {
//                 const xhr = new XMLHttpRequest();
//                 console.log(xhr)
//                 xhr.open('PUT', `/updateVisitor/${id}`, true)
//                 xhr.onload = function() {
//                     if(this.status == 200) {
//                         let data = JSON.parse(this.responseText)
//                     }
//                 }
//                 xhr.send()
//             }
//             updateVisitor()
//         })
//     }
// }, 2000)


setTimeout(function openUpdate() {
    let updateButton = document.querySelectorAll('.update-button')
    let updateForm = document.querySelector('.update-form')
    let submitUpdate = document.querySelector('.submit-update')
    let addVisitorForm = document.querySelector('.add-visitor-form')
    let table = document.querySelector('.table')
    let updateHeading = document.querySelector('.update-heading')
    // console.log(submitUpdate)
    for (let i = 0; i < updateButton.length; i++) {
        updateButton[i].addEventListener('click', function() {
            const id = updateButton[i].classList[0]
            console.log(id)
            updateForm.style.display = 'block'
            addVisitorForm.style.display = 'none'
            table.style.display = 'none'
            updateHeading.innerHTML = updateHeading.innerText + id

            
        submitUpdate.addEventListener('click', function() {
            function updateVisitor() {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', `/updateVisitor/${id}`, true)
                xhr.onload = function() {
                    if(this.status == 200) {
                        let data = JSON.parse(this.responseText)
                    }
                }
                xhr.send()
                addVisitorForm.style.display = 'block'
                table.style.display = 'block'
            }
            updateVisitor()
        })
        

        })
    }
}, 2000)




