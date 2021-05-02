import AuthService from "../services/authService.js"
import {FORCE_REPAINT} from "../config.js";


const Login = {
    render: async() => {
        return await ejs.render(
            `<form id="loginForm" action="#/login" method="post">
                <fieldset>
                    <div class="form-group">
                        <input required autocomplete="off" autofocus class="form-control" id="loginField" name="login" placeholder="Username" type="text"/>
                    </div>
                    <div class="form-group">
                        <input required class="form-control" id="passwordField" name="password" placeholder="Password" type="password"/>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-default" type="submit">Log In</button>
                    </div>
                </fieldset>
            </form>`
        )
    }
    ,
    afterRender: async() => {
        const loginForm = document.querySelector('#loginForm')
        loginForm.addEventListener('submit', async e => {
            e.preventDefault();
            const login = loginForm['loginField'].value
            const password = loginForm['passwordField'].value
            await AuthService.login(login, password)
            window.dispatchEvent(new Event(FORCE_REPAINT))
        })
    }
}

export default Login