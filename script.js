function getAllowedLogins() {
	const meta = document.querySelector('meta[name="allowed-logins"]');
	if (!meta || !meta.content.trim()) {
		return ['Dolna', 'DOLNA', 'dolna'];
	}

	return meta.content
		.split(',')
		.map((name) => name.trim())
		.filter(Boolean);
}

function showMessage() {
	document.getElementById('loginBox').classList.add('hidden');
	setTimeout(() => {
		document.getElementById('messageBox').classList.remove('hidden');
	}, 1000);
}

async function validateWithServer(username) {
	try {
		const response = await fetch('/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username })
		});

		if (!response.ok) {
			return null;
		}

		const result = await response.json();
		return Boolean(result.success);
	} catch (error) {
		return null;
	}
}

async function login() {
	const username = document.getElementById('username').value.trim();
	if (!username) {
		alert('Please enter a login name.');
		return;
	}

	const serverResult = await validateWithServer(username);
	const allowedLogins = getAllowedLogins();
	const localResult = allowedLogins.includes(username);
	const isValid = serverResult === null ? localResult : serverResult;

	if (isValid) {
		showMessage();
		return;
	}

	alert('Invalid login name. Try again.');
}

document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('username').addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		login();
	}
});