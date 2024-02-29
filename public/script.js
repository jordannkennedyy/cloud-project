//listen for click
// 'DOMContentLoaded ensures all pages are loaded before it starts to listen'
// event listener for button
// on click, it will fetch /get_data endpoint, triggering the MySQL query, collect the response from MYSQL
// then add the data to innerHTML of the 'addData' element in index.ejs



document.addEventListener('DOMContentLoaded', function() {
    
    const button = document.getElementById("button1");

    button.addEventListener('click', function(e) {
        fetch('/get_data')
        .then(response => response.json())
        .then(data => {
            const addData = document.getElementById('addData');
            addData.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.log(error));
    });

});