import React, { useState, useRef } from 'react';

import { useLocation, Link, useNavigate } from 'react-router-dom';

import './ListNameDogs.scss';

const ListNameDogs = () => {
    const navigate = useNavigate();


    const [breeds, setBreeds] = useState([
        "A",
        "Австралійська вівчарка",
        "Американська акіта",
        "Американський кокер-спанієль",
        "Англійський бульдог",
        "Англійський кокер-спанієль",
        "Англійський сетер",
        "Акіта-іну",
        "",
        "Б",
        "Басенджі",
        "Басет-гаунд",
        "Бельгійська вівчарка малінуа",
        "Бернський зенненхунд",
        "Бігль",
        "Бішон фрізе",
        "Бладгаунд",
        "Боксер",
        "Бордер-коллі",
        "Брюсельський грифон",
        "Бульмастиф",
        "Бультер'єр",
        "",
        "В",
        "Вельш-коргі-кардиган",
        "Вельш-коргі-пембок",
        "Вест-хайленд-вайт-тер'єр",
        "",
        "Г",
        "Гончак Гамільтона",
        "",
        "Д",
        "Далматин",
        "Доберман",
        "Джек-Рассел-Тер'єр",
        "",
        "Е",
        "Ердельтер'єр",
        "Естонська гонча",
        "",
        "З",
        "Золотистий ретривер",
        "",
        "І",
        "Ірландський вовкодав",
        "Ірландський сетер",
        "Ірландський тер'єр",
        "Італійська болонка",
        "Італійський хорт",
        "",
        "Й",
        "Йоркширський тер'єр",
        "",
        "К",
        "Кавалер-Кінг-Чарльз-Спаніель",
        "Кане Корсо",
        "Карпатський Гончак",
        "Континентальний Той-Спаніель",
        "Кроляча Такса",
        "Курцхар",
        "",
        "Л",
        "Лабрадор Ретривер",
        "",
        "М",
        "Мальтійська Болонка",
        "Мопс",
        "",
        "Н",
        "Німецька Вівчарка",
        "Німецький Боксер",
        "Німецький Дог",
        "Німецький Шпіц",
        "Німецький Ягдтер'єр",
        "Ньюфаундленд",
        "",
        "П",
        "Папільйон",
        "Пекінес",
        "Пінчер",
        "Померанський Шпіц",
        "Пудель",
        "",
        "Р",
        "Ротвейлер",
        "Російський Той-Тер'єр",
        "Російсько-Європейська Лайка",
        "",
        "С",
        "Самоїдська Лайка",
        "Сенбернард",
        "Сибірський Хаскі",
        "Скотч Тер'єр",
        "Стаффордширський Бультер'єр",
        "",
        "Т",
        "Такса",
        "Той-Пудель",
        "Ф",
        "Фокстер'єр",
        "Французький Бульдог",
        "",
        "Ч",
        "Чау-Чау",
        "Чихуахуа",
        "",
        "Ш",
        "Шарпей",
        "Шотландська Вівчарка",
        "Шиба-Іну",
        "Ши-Тцу",
        "",
        "Я",
        "Японський Хін",
        "Японський шпіц"
    ]);

    const [search, setSearch] = useState("");

    const filteredBreeds = breeds.filter((breed) =>
        breed.toLowerCase().includes(search.toLowerCase())
    );

    const alphabetRef = useRef(null);

    const scrollToLetter = (letter) => {
        const breedList = document.querySelector('.breed_dog_list');
        const breedListItems = breedList.querySelectorAll('li');

        for (const item of breedListItems) {
            if (item.textContent.startsWith(letter)) {
                item.scrollIntoView({ behavior: 'smooth', block: 'start' });
                break;
            }
        }
    };

    const handleAccountClick = () => {
        const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        if (loggedIn) {
            const userId = localStorage.getItem('UserId');
            navigate(`/myaccount/${userId}`);
            console.log(`handleAccountClick {UserId}`);
        } else {
            navigate('/login');
        }
    };

    return (
        <div>
            <h1 className='header_breed_dog_list'>Породи</h1>
            <i className="bi bi-person-circles" onClick={handleAccountClick}></i>
            <div className='container'>
                <div className='search_breed_dog_list'>
                    <input
                        type="text"
                        placeholder="Пошук"
                        className='search_input_breed_dog_list'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className='alphabet' ref={alphabetRef}>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('А')}>А</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Б')}>Б</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('В')}>В</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Г')}>Г</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Ґ')}>Ґ</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Д')}>Д</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Е')}>Е</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Є')}>Є</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Ж')}>Ж</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('З')}>З</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('И')}>И</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('І')}>І</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Ї')}>Ї</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Й')}>Й</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('К')}>К</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Л')}>Л</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('М')}>М</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Н')}>Н</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('О')}>О</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('П')}>П</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Р')}>Р</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('С')}>С</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Т')}>Т</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('У')}>У</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Ф')}>Ф</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Х')}>Х</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Ц')}>Ц</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Ч')}>Ч</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Ш')}>Ш</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Щ')}>Щ</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Ю')}>Ю</div>
                    <div className='alphabet-letter' onClick={() => scrollToLetter('Я')}>Я</div>
                </div>
            </div>
            <div className='breed_dog_list'>
                <ul>
                    {filteredBreeds.map((breed, index) => (
                        <li key={index}>
                            {breed && (
                                <Link to={`/dogs/${encodeURIComponent(breed)}`} state={{ breed }}>{breed}</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

};

export default ListNameDogs;