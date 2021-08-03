const weatherForm = document.querySelector("form")
const address = document.querySelector("input")
const forecast = document.querySelector("#forecast")
forecast.textContent = ""
weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    const location  = address.value;
    forecast.textContent = "Loading...."
    fetch("/weather?address="+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                forecast.textContent = data.error
            } else {
                
                forecast.textContent = data.Forecast
            }
        })
    })
})