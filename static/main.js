const alertBox = document.getElementById('alert-box')
const imgBox = document.getElementById('img-box')
const form = document.getElementById('p-form')

const name = document.getElementById('id_name')
const description = document.getElementById('id_description')
const image = document.getElementById('id_image')
const btnBox = document.getElementById('btn-box')
console.log(btnBox.children)
const btns = [...btnBox.children]

const mediaURL = window.location.href + 'media/'
console.log(mediaURL)

const csrf = document.getElementsByName('csrfmiddlewaretoken')
console.log(csrf)

const url = ""

const handleAlerts = (type, text) => {
    alertBox.innerHTML = `<div class="alert alert-${type}" role="alert">
                            ${text}
                        </div>`
}

image.addEventListener('change', () => {
    const img_data = image.files[0]
    const url = URL.createObjectURL(img_data)
    console.log(url)
    imgBox.innerHTML = `<img src="${url}" width="75%">`
    btnBox.classList.remove('not-visible')
})

let id = null
let filter = null
btns.forEach(btn => btn.addEventListener('click', () => {

    filter = btn.getAttribute('data-filter')
    console.log(filter)


}))

form.addEventListener('submit', e => {
    e.preventDefault()

    const fd = new FormData()
    fd.append('csrfmiddlewaretoken', csrf[0].value)
    fd.append('name', name.value)
    fd.append('description', description.value)
    fd.append('image', image.files[0])
    fd.append('action', filter)
    fd.append('id', id)

    $.ajax({
        type: 'POST',
        url: url,
        enctype: 'multipart/form-data',
        data: fd,
        success: function(response) {
            const data = JSON.parse(response.data)
            console.log(data)

            imgBox.innerHTML = `<img src="${mediaURL + data[0].fields.image}" width="75%">`
            const sText = `successfully saved ${data[0].fields.name}`
            handleAlerts('success', sText)
            setTimeout(() => {
                alertBox.innerHTML = ""

            }, 3000)
        },
        error: function(error) {
            console.log(error)
            handleAlerts('danger', 'ups..something went wrong')
        },
        cache: false,
        contentType: false,
        processData: false,
    })
})

console.log(form)