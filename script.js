const getData = (url) => {
    return fetch(url)
        .then((response) => {
            return response.json();
        });
}

(async () => {

    const Data = await getData('data/data.json');

    $(window).scroll(function(){
        const $agent = $('.agent-image');
        const $bio = $('.agent-bio');
        const pos = window.scrollY;
        const tes = document.querySelector('.ability-wrapper').offsetTop;
        if (pos < tes) {
            $agent.css({
                'transform': 'translate(0, -' + pos / 30 + '%)'
            });
            $bio.css({
                'transform': 'translate(0, -' + pos / 6 + '%)'
            });
        }
    });

    let index = document.querySelector('.active1').dataset.index;
    let active = document.querySelector('.active1').dataset.agent;
    let activeAgent = Data[index];

    const agentList = document.querySelectorAll('.carousel h1');
    const agentImg = document.querySelector('.agent-image img');
    const agentBio = document.querySelector('.agent-bio p');

    const skillList = document.querySelectorAll('.skill-list li');
    const skillImg = document.querySelectorAll('.skill-list li img');
    const skillName = document.querySelector('.skill-desc h2');
    const skillDesc = document.querySelector('.skill-desc p');
    const skillVid = document.querySelector('.skill-preview');

    agentImg.classList.add('fade');
    setTimeout(() => {
        agentImg.className = '';
    }, 600);

    agentBio.classList.add('slide-up');
    setTimeout(() => {
        agentBio.className = '';
    }, 600);

    agentList.forEach(agent => {
        agent.addEventListener('click', function () {
            if (this.classList.item(0) === null) {

                index = this.dataset.index;
                active = this.dataset.agent;
                activeAgent = Data[index];

                agentList.forEach(agent => {
                    agent.className = '';
                });
                this.classList.add('active1');

                agentImg.classList.add('fade');
                setTimeout(() => {
                    agentImg.className = '';
                }, 600);
                agentImg.src = `assets/img/${active}.png`;

                agentBio.classList.add('slide-up');
                setTimeout(() => {
                    agentBio.className = '';
                }, 600);
                agentBio.innerHTML = activeAgent.bio;

                skillList.forEach(skill => {
                    skill.className = '';
                });
                skillList[0].classList.add('active2');

                skillImg[0].src = `assets/skills/${active}-q.png`;
                skillImg[1].src = `assets/skills/${active}-e.png`;
                skillImg[2].src = `assets/skills/${active}-c.png`;
                skillImg[3].src = `assets/skills/${active}-x.png`;

                skillName.innerHTML = activeAgent.q;
                skillDesc.innerHTML = activeAgent.qDesc;
                skillVid.src = `assets/vid/${active}-q.mp4`;
            }
        });
    });

    skillList.forEach(skill => {
        skill.addEventListener('click', function () {
            if (this.classList.item(0) === null) {

                skillList.forEach(skill => {
                    skill.className = '';
                });
                this.classList.add('active2');

                skillName.classList.add('slide-up');
                setTimeout(() => {
                    skillName.className = '';
                }, 600);

                skillDesc.classList.add('slide-up');
                setTimeout(() => {
                    skillDesc.className = '';
                }, 800);

                const activeSkill = this.dataset.skill;
                skillName.innerHTML = activeAgent[activeSkill];
                skillDesc.innerHTML = activeAgent[`${activeSkill}Desc`];
                skillVid.src = `assets/vid/${active}-${activeSkill}.mp4`;
                
            }
        });
    });
})();