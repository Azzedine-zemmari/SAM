document.querySelectorAll('.program-head-item')[0].classList.add('active');
document.querySelectorAll('.program-body')[0].style.display = 'block'
document.querySelectorAll('.program-head-item').forEach((ele,index)=>{
ele.onclick = ()=>{
    let bodies = document.querySelectorAll('.program-body');
    let heads = document.querySelectorAll('.program-head-item');
    heads.forEach((item)=>{
        item.classList.remove('active');
    });
    heads[index].classList.add('active');
    bodies.forEach((item_2)=>{
        item_2.style.display = 'none';
    });
    bodies[index].style.display = 'block';

}
});