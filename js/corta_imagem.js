window.onload = () => {
    const form = document.querySelector("#form-upload-imagem");
    const imgAntiga = document.querySelector("#imagem-antigo img");
    const aImgNova = document.querySelector("#imagem-nova a");
    const imgNova = document.querySelector("#imagem-nova a img");

    form.addEventListener("submit", (e) => {
        // Impedindo o envio da requisição ao cabeçalho
        e.preventDefault();
        
        // Acessando as informações do formulário
        const formData = new FormData(e.target);

        // Alimentando a variável com a imagem do formulário
        const file = formData.get("imagem");

        // Verificando se foi inserido uma imagem
        if (file) {
            // Definimos aqui o tamanho padrão de imagem que será salvo
            const width = 256;
            const height = 256;

            // file name com a extnsão
            const fileName = file.name;

            // tratendo o nome, separando pelos pontos
            let splitName = (file.name).split(".");
            
            // retirando a extenção para algum uso futuro
            let extencao = splitName.pop();
            
            // remontando o nome sem a extensão
            let fileName2 = "";
            while(splitName.length > 0){
                console.log(splitName.length);
                fileName2 = `${fileName2}${splitName.pop()}`;
            }
    
            // Iniciando a Leitura de arquivo
            const reader = new FileReader();
    
            // Lendo a imagem
            reader.readAsDataURL(file);
    
            // Carregando e Executando o Imagem
            reader.onload = (e) => {
    
                // Iniciando um elemento Imagem
                const image = new Image();
    

                imgAntiga.src = e.target.result;

                // Inserindo a imagem original para leitura
                image.src = e.target.result;
    
                image.onload = () => {
                    // Criando um elemento canvas
                    const elem = document.createElement('canvas');

                    // Recebendo o contexto 2D;
                    const ctx = elem.getContext('2d');
    
                    // coordenadas origem (source)
                    let sx = 0
                    ,sy = 0
                    ,sWidth = image.width
                    ,sHeight = image.height
                    // tamanho destino
                    ,dWidth = width
                    ,dHeight = height
                    // tamanho ideal
                    ,iWidth = Math.round(sHeight / dHeight * dWidth)
                    ,iHeight = Math.round(sWidth / dWidth * dHeight);
    
                    if (sWidth > iWidth) { // cortar na largura
                        sx = parseInt((sWidth - iWidth) / 2);
                        sWidth = iWidth;
                    } else if (sHeight > iHeight) { // cortar na altura
                        sy = parseInt((sHeight - iHeight) / 2);
                        sHeight = iHeight;
                    }
    
                    elem.width = dWidth;
                    elem.height = dHeight;
    
                    // image.width e image.height irá conter as dimensões originais
                    ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);

                    let newImage = ctx.canvas.toDataURL(Blob, 'image/png', 1);

                    aImgNova.download = fileName;
                    aImgNova.href = newImage;
                    imgNova.src = newImage;
                    
                }
                reader.onerror = error => console.log(error);
            };
        }
    });
};