document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const alert = document.getElementById('alert');

    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value.replace(/\D/g, '').slice(0, 6);
        e.target.value = password;
        
        const errors = validatePassword(password);
        updateAlert(errors);
    });

    function validatePassword(pw) {
        const errors = [];

        if (pw.length !== 4) {
            errors.push('Password must be exactly 4 digits');
            return errors;
        }

        const checks = [
            { test: /^(\d)\1{3}$/, message: 'Cannot use the same digit repeatedly' },
            { test: /^0123|1234|2345|3456|4567|5678|6789$/, message: 'Cannot use ascending sequence' },
            { test: /^9876|8765|7654|6543|5432|4321|3210$/, message: 'Cannot use descending sequence' },
            { test: (p) => p === p.split('').reverse().join(''), message: 'Cannot use palindromes' },
            { test: /^(\d)(\d)\1\2$/, message: 'Cannot use simple patterns' },
            { test: /^0000|9999$/, message: 'Cannot use all 0s or all 9s' },
            { test: /^1474|1447|4714|4741|7414|7441$/, message: 'Cannot use 3/4 in a line on a calculator' },
            { test: /^(19|20)\d{2}$/, message: 'Cannot use years' },
            { test: /^8008$/, message: 'Cannot use numbers that look funny upside down' },
            { test: /^420|^69|69$/, message: 'Cannot use meme numbers' },
            { test: /^[13579]{4}$/, message: 'Cannot use only odd numbers' },
            { test: /^[24680]{4}$/, message: 'Cannot use only even numbers' },
            { test: /^(0|2|4|6|8)(1|3|5|7|9)(0|2|4|6|8)(1|3|5|7|9)$/, message: 'Cannot alternate even and odd numbers' },
            { test: /^(\d)(?!\1)(\d)(?!\2)(\d)(?!\3)\d$/, message: 'Cannot use a sequence where all digits are different' },
            { test: (p) => {
                const nums = p.split('').map(Number);
                return nums[2] === (nums[0] + nums[1]) % 10 && nums[3] === (nums[1] + nums[2]) % 10;
            }, message: 'Cannot use Fibonacci-like sequences' },
            { test: (p) => {
                const nums = p.split('').map(Number);
                return nums[1] - nums[0] === nums[2] - nums[1] && nums[2] - nums[1] === nums[3] - nums[2];
            }, message: 'Cannot use arithmetic progressions' },
            { test: (p) => {
                const nums = p.split('').map(Number);
                return nums[1] % nums[0] === 0 && nums[2] % nums[1] === 0 && nums[3] % nums[2] === 0;
            }, message: 'Cannot use geometric progressions' },
            { test: (p) => {
                const primes = [2, 3, 5, 7];
                return primes.includes(Number(p[0])) && primes.includes(Number(p[2]));
            }, message: 'Cannot use prime numbers in prime positions' },
            { test: (p) => [1, 4, 10, 20, 35, 56, 84].includes(Number(p)), message: 'Cannot use tetrahedral numbers' },
            { test: (p) => Math.sqrt(Number(p)) % 1 === 0, message: 'Cannot use perfect squares' },
            { test: (p) => [1634, 8208, 9474].includes(Number(p)), message: 'Cannot use narcissistic numbers' },
            { test: (p) => Number(p) % p.split('').reduce((sum, digit) => sum + Number(digit), 0) === 0, message: 'Cannot use Harshad numbers' },
            { test: (p) => [9, 4950].includes(Number(p)), message: 'Cannot use Kaprekar numbers' },
            { test: (p) => /^1+$|^2+$/.test(Number(p).toString(3)), message: 'Cannot use repdigits in base 3' },
            { test: (p) => {
                const binary = Number(p).toString(2);
                return binary === binary.split('').reverse().join('');
            }, message: 'Cannot use binary palindromes' },
            { test: (p) => {
                const reversed = Number(p.split('').reverse().join(''));
                const sum = Number(p) + reversed;
                return sum.toString() === sum.toString().split('').reverse().join('');
            }, message: 'Cannot use reverse and add palindromes' },
            { test: (p) => {
                const num = Number(p);
                for (let i = 2; i <= Math.sqrt(num); i++) {
                    if (num % i === 0 && num % (i * i) !== 0) return false;
                }
                return true;
            }, message: 'Cannot use powerful numbers' },
            { test: (p) => {
                const isPrime = (n) => {
                    for (let i = 2; i <= Math.sqrt(n); i++) {
                        if (n % i === 0) return false;
                    }
                    return n > 1;
                };
                const rotations = [p];
                for (let i = 0; i < 3; i++) {
                    rotations.push(rotations[i].slice(1) + rotations[i][0]);
                }
                return rotations.every(r => isPrime(Number(r)));
            }, message: 'Cannot use circular prime patterns' },
        ];

        checks.forEach(({ test, message }) => {
            if (typeof test === 'function' ? test(pw) : test.test(pw)) {
                errors.push(message);
            }
        });

        return errors;
    }

    function updateAlert(errors) {
        if (errors.length === 0) {
            alert.className = 'alert alert-success';
            alert.innerHTML = '<strong>Success:</strong> Password is valid!';
        } else {
            alert.className = 'alert alert-error';
            alert.innerHTML = '<strong>Error:</strong><br>' + errors.join('<br>');
        }
    }
});
