function resetResult(){
    //Supaya div result nya hilang ketika tombol reset diclick
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML= `
    `;
    resultDiv.style.visibility = "hidden";
}

function showResult(){
    //Ambil data inputan form
    var major = document.getElementById("major").value;
    var nama = document.getElementById("nama").value;
    var email = document.getElementById("email").value;
    var komentar = document.getElementById("komentar").value;

    //Validasi nama atau email yang kosong
    if(nama == "" || email == ""){
        alert("Tolong isi nama dan email ya.");
        return;
    }

    //Split atau explode email (untuk dipisah jadi (at) nanti)
    email = email.split('@');

    //Cek apakah ada badword, false kalo engga ada badword
    var censoredWords = findCensoredWord(komentar.toLowerCase().split(" "));

    var resultDiv = document.getElementById("result");

    if(censoredWords === false){
        resultDiv.innerHTML= `
            <h1> Results : </h1>
            <h2> Hi <span> ${nama} </span> !</h2>
            <h4> Kamu dari major <span> ${major} </span> ya. </h4>
            <h4> <span> ${email[0]} </span> (at) <span> ${email[1]} </span>, Ini benar email kamu? </h4>
            <h4> Berikut komentar kamu yang kami terima: </h4>
            <h5> ${komentar} </h5>
            <h6> Jumlah kata dalam komentar: ${komentar.split(/\b\S+\b/).length - 1} kata.</h6>
        `;
    } else {
        resultDiv.innerHTML= `
            <h1> Results : </h1>
            <h2> Hi <span> ${nama} </span> !</h2>
            <h4> Kamu dari major <span> ${major} </span> ya. </h4>
            <h4> <span> ${email[0]} </span> (at) <span> ${email[1]} </span>, Ini benar email kamu? </h4>
            <h4> Berikut komentar kamu yang kami terima: </h4>
            <h5> ${komentar} </h5>
            <h6> Jumlah kata dalam komentar: ${komentar.split(/\b\S+\b/).length - 1} kata.</h6>
            <h6> Maaf nih, komentar kamu mengandung kata : ${censoredWords}. Tolong diganti yaa </h6>
        `;
    }

    resultDiv.style.visibility = "visible";
}

function findCensoredWord(komentarArr){
    //komentarArr adalah array yang isinya komentar lowercase yang di-split spasi
    //Kata badword (kalo mau tambahin harus huruf kecil)
    var badWords = ["anjing", "babi", "monyet", "kasar", "keledai", "jelek", "busuk"];
    var foundBadWords = [];

    komentarArr.forEach(kata => {
        //Kalau kata komentar termasuk badword dan belum ada ditemukan sebelumnya, tambahkan ke foundBadWord
        if(badWords.includes(kata) && !foundBadWords.includes(kata)){
            foundBadWords.push(kata);
        }
    });

    if(foundBadWords.length !== 0){
        return foundBadWords;
    } else {
        return false;
    }
}