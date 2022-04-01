window.onload = function() {
    loadVisitors()
}

function loadVisitors() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/viewVisitors', true)

    xhr.onload = function() {
        if(this.status == 200) {
            const data = JSON.parse(this.responseText)
            const tableBody = document.querySelector('.table-body')

            for (let i = 0; i < data.length; i++) {
                let newTable = tableBody.innerHTML += `
            <tr class="row-id-${data[i].visitor_id}">
                <td>${data[i].visitor_id}</td>
                <td class="table-data-${data[i].visitor_id}">${data[i].visitor_name}</td>
                <td class="table-data-${data[i].visitor_id}">${data[i].visitor_age}</td>
                <td class="table-data-${data[i].visitor_id}">${data[i].date_of_visit}</td>
                <td class="table-data-${data[i].visitor_id}">${data[i].time_of_visit}</td>
                <td class="table-data-${data[i].visitor_id}">${data[i].assisted_by}</td>
                <td class="table-data-${data[i].visitor_id}">${data[i].comments}</td>
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


setTimeout(function() {
    const updateButton = document.querySelectorAll('.update-button')
    const updateForm = document.querySelector('.update-form')
    const submitUpdate = document.querySelector('.submit-update')
    const addVisitorForm = document.querySelector('.add-visitor-form')
    const table = document.querySelector('.table')
    const updateHeading = document.querySelector('.update-heading')
    const updateFormFields = document.querySelectorAll('.update-field')

    for (let i = 0; i < updateButton.length; i++) {
        updateButton[i].addEventListener('click', function() {
            const id = updateButton[i].classList[0]
            const columnData = document.querySelectorAll('.table-data-'+id)
            
            columnData[2].innerText = columnData[2].innerText.match(/.{10}/)
            for (let j = 0; j < columnData.length; j++) {
                updateFormFields[j].value = columnData[j].innerText
            }

            updateForm.action = updateForm.action + '/' +id
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




