// 1. Анализ поведения Promise
console.log("Задание 1:");
const promise = new Promise(function(resolve, reject) {
    resolve(1);
    setTimeout(() => resolve(2), 1000);
});
promise.then(console.log); // Выведет: 1

// 2. Промисификация функции (адаптированная для Node.js)
console.log("\nЗадание 2:");
function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
        const fs = require('fs');
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(new Error(`Ошибка чтения файла ${filename}: ${err.message}`));
            } else {
                resolve(data);
            }
        });
    });
}

// 3. Функция с периодическим суммированием
console.log("\nЗадание 3 и 4:");
function delayedSum(a, b) {
    return new Promise((resolve, reject) => {
        if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
            reject(new Error('Оба аргумента должны быть числами'));
            return;
        }

        let count = 0;
        let currentSum = a;

        const intervalId = setInterval(() => {
            currentSum += b;
            count++;
            console.log(`Итерация ${count}: Сумма = ${currentSum}`);

            if (count === 5) {
                clearInterval(intervalId);
                resolve(currentSum);
            }
        }, 2000);
    });
}

// 4. Реализация через async/await
console.log("\nЗадание 5:");
async function readFileAsync(filename) {
    try {
        const data = await readFilePromise(filename);
        console.log(`Содержимое файла ${filename}: ${data.length} символов`);
        return data;
    } catch (err) {
        console.error('Ошибка:', err.message);
        throw err;
    }
}

// 5. Получение результата async-функции внутри обычной функции
console.log("\nЗадание 6:");
async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 10;
}

function f() {
    wait().then(result => {
        console.log(`Результат из async-функции: ${result}`);
    });
}

// 6. Моделирование собеседования (с уменьшенными временами для демонстрации)
console.log("\nЗадание 7:");
async function interviewTask(candidate, taskNum, prepTime, defenseTime) {
    console.log(`${candidate} started the ${taskNum} task.`);
    await new Promise(resolve => setTimeout(resolve, prepTime * 100));
    console.log(`${candidate} moved on to the defense of the ${taskNum} task.`);
    await new Promise(resolve => setTimeout(resolve, defenseTime * 100));
    console.log(`${candidate} completed the ${taskNum} task.`);
}

async function interviews(candidates) {
    for (const [name, prep1, defense1, prep2, defense2] of candidates) {
        await interviewTask(name, 1, prep1, defense1);
        console.log(`${name} is resting.`);
        await new Promise(resolve => setTimeout(resolve, 500));
        await interviewTask(name, 2, prep2, defense2);
    }
}

// Демонстрация работы всех функций
(async () => {
    console.log("\nДемонстрация работы всех функций:");

    // Создаем тестовый файл для демонстрации
    const fs = require('fs');
    const testFilename = 'test-file.txt';
    fs.writeFileSync(testFilename, 'Это тестовый файл для демонстрации работы промисов');

    // Задание 2 и 5
    console.log("\nДемонстрация чтения файла:");
    await readFileAsync(testFilename);

    // Задание 3 и 4
    console.log("\nДемонстрация delayedSum:");
    try {
        const result = await delayedSum(2, 3);
        console.log(`Финальный результат: ${result}`);

        // Демонстрация ошибки
        await delayedSum(2, 'abc');
    } catch (err) {
        console.error('Ошибка:', err.message);
    }

    // Задание 6
    console.log("\nДемонстрация получения результата async-функции:");
    f();

    // Задание 7
    console.log("\nДемонстрация модели собеседования:");
    await interviews([
        ['Ivan', 5, 2, 7, 2],
        ['John', 3, 4, 5, 1],
        ['Sophia', 4, 2, 5, 1]
    ]);

    // Удаляем тестовый файл
    fs.unlinkSync(testFilename);
})();
