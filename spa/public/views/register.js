import AuthService from "../services/authService.js";

const html = `<form id="registerForm" action="#/register" method="post">
    <fieldset>
        <div class="form-group">
            <input required autocomplete="off" autofocus class="form-control" id="loginField" name="login" placeholder="Username" type="text"/>
        </div>
        <div class="form-group">
            <input required class="form-control" id="passwordField" name="password" placeholder="Password" type="password"/>
        </div>
        <div class="form-group">
            <input required class="form-control" id="passwordConfirmField" name="password_confirm" placeholder="Password (again)" type="password"/>
        </div>
        <div class="form-group">
            <button class="btn btn-default" type="submit">Register</button>
        </div>
    </fieldset>
</form>`
const Register = {
    render: async () => {
        return await ejs.render(html)
    },
    afterRender: async () => {
        const registerForm = document.querySelector('#registerForm')
        registerForm.addEventListener('submit', async e => {
            e.preventDefault();
            const login = registerForm['loginField'].value
            const password = registerForm['passwordField'].value
            const passwordConfirm = registerForm['passwordConfirmField'].value
            await AuthService.register(login, password, passwordConfirm)
        })
    }
}

export default Register