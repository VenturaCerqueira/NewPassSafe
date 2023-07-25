const inputEl = document.querySelector("#password")
      const upperCaseCheckEl = document.querySelector("#uppercase-check")
      const numberCheckEl = document.querySelector("#number-check")
      const symbolCheckEl = document.querySelector("#symbol-check")
      const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

      let passwordLength = 16

      //Gera numeros Aleatorios
      function generatePassword() {
        let chars = "abcdefghjkmnpqrstuvwxyz"
        const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
        const numberChars = "123456789"
        const symbolChars = "?!@&*()[]"
       
        
        if (upperCaseCheckEl.checked) {
          chars += upperCaseChars
        }

        if (numberCheckEl.checked) {
          chars += numberChars
        }

        if (symbolCheckEl.checked) {
          chars += symbolChars
        }

        let password = ""

        for (let i = 0; i < passwordLength; i++) {
          const randomNumber = Math.floor(Math.random() * chars.length)
          password += chars.substring(randomNumber, randomNumber + 1)
        }

        inputEl.value = password
        calculateQuality()
        calculateFontSize()
      }

      function calculateQuality(){
            // 020% -> Critical
            // 100% -> Safe

            // Tamanho*P1 + Numeros*P2 + Simbolo *P3 = 100 %
            // 33 + 33 + 33 = 99% Aproximadamante 100%
            // 25 + 25 + 25 +25 = 100 % 

            // Nosso Calculo :
            // T*0.25 + M*0.15 + N*0.25 + S*0.25 = 100%

            // Arrumar a logica
            const porcent = Math.round((passwordLength/64)* 35 + (upperCaseCheckEl.checked ? 15 : 0) + (numberCheckEl.checked ? 25 : 0) + (symbolCheckEl.checked ? 25 : 0))
            securityIndicatorBarEl.style.width = `${porcent}%`
            if(porcent > 69){
                //safe
                securityIndicatorBarEl.classList.remove('critical')
                securityIndicatorBarEl.classList.remove('warning')
                securityIndicatorBarEl.classList.add('safe')
            }else if (porcent > 40){
                // warning
                securityIndicatorBarEl.classList.remove('critical')
                securityIndicatorBarEl.classList.remove('safe')
                securityIndicatorBarEl.classList.add('warning')
            } else{
                securityIndicatorBarEl.classList.remove('warning')
                securityIndicatorBarEl.classList.remove('safe')
                securityIndicatorBarEl.classList.add('critical')
            }
            if (porcent >= 100){
                securityIndicatorBarEl.classList.add("completed")
            }else{
                securityIndicatorBarEl.classList.remove("completed")
            }   
      }
      function calculateFontSize () {
            if(passwordLength > 45) {
                inputEl.classList.remove("font-sm")
                inputEl.classList.remove("font-xs")
                inputEl.classList.add("font-xxs")
            }else if ( passwordLength > 32){
                inputEl.classList.remove("font-sm")
                inputEl.classList.add("font-xs")
                inputEl.classList.remove("font-xxs")
            }else if (passwordLength > 22){
                inputEl.classList.add("font-sm")
                inputEl.classList.remove("font-xs")
                inputEl.classList.remove("font-xxs")   
            }else{
                inputEl.classList.remove("font-sm")
                inputEl.classList.remove("font-xs")
                inputEl.classList.remove("font-xxs")   
            }
      }
      function copy() {
        navigator.clipboard.writeText(inputEl.value)
      }
      function showHide(){
        var inputPass = document.getElementById('password')
        var btnSenha = document.getElementById('hiden')
        if(inputPass.type === 'text'){
          inputPass.setAttribute('Type', 'password')
        }
        else if (inputPass.type === 'password'){
          inputPass.setAttribute('Type', 'text')

        }
      }

      const passwordLengthEl = document.querySelector("#password-length")

      passwordLengthEl.addEventListener("input", function () {
        passwordLength = passwordLengthEl.value
        document.querySelector("#password-length-text").innerText = passwordLength
        generatePassword()
      })
      upperCaseCheckEl.addEventListener("click", generatePassword)
      numberCheckEl.addEventListener("click", generatePassword)
      symbolCheckEl.addEventListener("click", generatePassword)

      document.querySelector("#copy-1").addEventListener("click", copy)
      document.querySelector("#copy-2").addEventListener("click", copy)
      document.querySelector("#renew").addEventListener("click", generatePassword)
      document.querySelector("#newKey").addEventListener("click", generatePassword)

      generatePassword()