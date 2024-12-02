<template>
    <div class="login-box">
        <h2 class="login-title">LOGIN</h2>
        <form @submit.prevent="authorize" class="center">
            <div class="input-group">
                <input
                    type="text"
                    id="username"
                    v-model="email"
                    placeholder="Enter Username"
                    required
                />
            </div>
            <div class="input-group">
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    placeholder="Enter Password"
                    required
                />
            </div>
            <div class="forgot-password">
                <a href="#" @click.prevent="forgotPassword">Forgot Password?</a>
            </div>
            <button type="submit" class="authorize-button">AUTHORIZE</button>
        </form>
    </div>


</template>


<script setup>
    import {ref} from 'vue'
    import {useUserStore} from "/stores/users.js"
    import {useStore} from "/stores/index.js"
    import { useRouter } from 'vue-router';

    const userStore = useUserStore()
    const store = useStore()

    const router = useRouter();

    const email = ref('');
    const password = ref('');

    const authorize = () => {
        const user = userStore.login({email: email.value, password: password.value})
        if (user){
            store.toggleLoginPanel();
            router.push('/');
        }
    }

</script>


<style scoped>

    .login-box {
        position: absolute;
        right: 38%;
        top: 15%;
        background: rgb(222, 221, 221);
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        text-align: center;
        width: 25%;
        height: 70%;
        z-index: 1000;
    }

    .login-title {
        background-color: #44dee3;
        color: white;
        font-size: 24px;
        height: 4rem;
        align-items: center;
        display: flex;
        justify-content: center;
        margin-top: 0;
        margin-bottom: 1.5rem;
    }

    .input-group {
        margin-bottom: 1rem;
        margin-top: 2rem;
        text-align: left;
    }

    label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    input {
        padding: 0.8rem;
        font-size: 16px;
        font-weight: bold;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .forgot-password {
        background-color: white;
        padding: 3px 6px;
        margin-bottom: 1rem;
        text-align: right;
    }

    .forgot-password a {
        color: #0056b3;
        text-decoration: none;
        font-size: 14px;
    }

    .forgot-password a:hover {
        text-decoration: underline;
    }

    .authorize-button {
        background-color: #00cc00;
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        margin-top: 2rem;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s;
    }

    .authorize-button:hover {
        background-color: #009900;
    }

    .center {
        font-weight: bold;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
</style>