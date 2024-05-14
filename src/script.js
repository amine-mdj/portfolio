
const nav = document.querySelector('.nav');
navlist = nav.querySelectorAll(".li");
totalnavlist = navlist.length;
allsection = document.querySelectorAll('.section');
totalsection = allsection.length;
for(i=0; i<totalnavlist; i++)
{
    const a = navlist[i].querySelector('a');
    a.addEventListener("click", function()
    {
        for(j=0; j<totalnavlist; j++){
        if(navlist[j].querySelector("a").classList.contains('active')){
        allsection[j].classList.add('back-section');
        }
        
            navlist[j].querySelector("a").classList.remove('active');
        }
        this.classList.add('active');
        showSection(this);
    }
    )
}

function showSection(element){
    for(i=0; i<totalsection; i++){
        allsection[i].classList.remove('active')
    }
    const target = element.getAtrribute('href').split('#')[1];
    document.querySelector('#' + target).classList.add('active');
}

