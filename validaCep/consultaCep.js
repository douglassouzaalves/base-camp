var submitButton = document.querySelector("#app form button") //Lembrando que aqui é onde vai "mapeando" até chegar no destino.
var zipCodeField = document.querySelector("#app form input")
var content = document.querySelector("#app main")

submitButton.addEventListener("click", run)

function run (event) {
    event.preventDefault()

    var zipCode = zipCodeField.value

    zipCode = zipCode.replace(" ", "")
    zipCode = zipCode.replace(".", "")
    zipCode = zipCode.replace("-", "")

    zipCode = zipCode.trim();

    axios
        .get("https://viacep.com.br/ws/" + zipCode + "/json/")
        .then(function (response) {
            if (response.data.erro) {
                throw new Error("CEP inválido!")
            }
            
            content.innerHTML = "" //Esvazia o conteúdo, caso seja preenchido anteriormente.
            createLine(response.data.logradouro)
            createLine(response.data.localidade + "/" + response.data.uf)
            createLine(response.data.bairro)
        })
        .catch(function (error) {
            content.innerHTML = ""
            createLine("Ops, algo deu errado, tente novamente...")
        })
}

function createLine (text) {
    var line = document.createElement("p")
    var text = document.createTextNode(text)

    line.appendChild(text);
    content.appendChild(line);
}

