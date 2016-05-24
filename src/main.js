var days = function () {
    const attachClickListener = (selector, cb) => {
        document.addEventListener('click', (event) => {
            event.preventDefault();
            let set = new Set(event.target.classList);
            if (set.has(selector)) {
                cb(event);
            }
        });
    }

    const sub = (channel, cb) => {
        window.addEventListener(channel, cb)
    }

    const pub = (label, data) => {
        let event = new CustomEvent(label, { 'detail': data });
        window.dispatchEvent(event);
    }

    const headerClick = (event) => {
        let type = event.target.dataset.selector;
        pub('newTab', type);
        for (let el of document.getElementsByClassName('title')) {
            el.classList.remove('selected');
        };
        event.target.classList.add('selected');
    }

    const runClick = (event) => {
        let str = `${document.getElementById('day').value} / ${document.getElementById('month').value} / ${document.getElementById('year').value}`
        document.getElementById('result').value = str;
        console.log(str);
    }

    const newTab = (event) => {
        let {detail} = event;
        let tabs = [...document.getElementsByClassName('tab')];
        tabs.map(el => el.classList.add('hidden'));
        document.getElementById(detail).classList.remove('hidden');
    }

    const populateDate = () => {

        let date = new Date();
        let currentYear = date.getFullYear();
        let currentMonth = date.getMonth();
        let currentDate = date.getDate();
        let daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

        let frag = document.createDocumentFragment();

        let daysList = document.createElement('select');
        daysList.id = 'day';
        for (let i = 0; i < daysInMonth; i++) {
            let option = document.createElement('option');
            option.textContent = `${i}`;
            option.value = i;
            if (currentDate === i) {
                option.selected = true;
            }
            daysList.appendChild(option);
        }
        frag.appendChild(daysList);

        let monthList = document.createElement('select');
        monthList.id = 'month';
        let monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (let m of monthArr) {
            let option = document.createElement('option');
            option.textContent = `${m}`;
            if (monthArr.indexOf(m) === currentMonth) {
                option.selected = true;
            }
            monthList.appendChild(option);
        }
        frag.appendChild(monthList);

        let yearList = document.createElement('select');
        yearList.id = 'year';
        for (var i = currentYear - 10; i < currentYear + 20; i++) {
            let option = document.createElement('option');
            option.textContent = `${i}`;
            option.value = i;
            if (currentYear === i) {
                option.selected = true;
            }
            yearList.appendChild(option);
        }
        frag.appendChild(yearList);

        document.getElementById('datecontainer').appendChild(frag);
    }

    return {
        pub: pub,
        sub: sub,
        init: function () {
            console.log('init');
            sub('newTab', newTab);
            populateDate();
            attachClickListener('title', headerClick);
            attachClickListener('results', runClick);
        }
    }
} ();

document.addEventListener("DOMContentLoaded", () => {
    console.log('dom loaded');
    days.init();
});