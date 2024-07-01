document.querySelector('.burger').addEventListener('click', function(){
    const sidebar = document.querySelector('.sidebar');
    if(sidebar.classList.contains('active')){
        sidebar.classList.remove('active');
    }else{
        sidebar.classList.add('active');
    }
});