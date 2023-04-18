<template>
    <div class="test-css">
        <div class="flexbox-test">
            <h1>lnk</h1>
            <div class="menu-navigation">
                <ul class="site-nav">
                    <li><a href="#" target="_blank" >Home</a></li>
                    <li><a href="#" target="_blank" >Features</a></li>
                    <li><a href="#" target="_blank" >Pricing</a></li>
                    <li><a href="#" target="_blank" >Support</a></li>
                    <li class="nav-right-item"><a href="#" target="_blank" >About</a></li>
                </ul>
            </div>
            
            <div class="content">
                <div class="content-left">
                    <h1>Team collaboration done right</h1>
                    <p>Thousands of teams from all over the world turn to lnk to communicate and get things done.</p>
                </div>
                <div class="content-right">
                    <div class="right-login">
                        <form class="login-form">
                            <h3>Login</h3>
                            <p>
                                <label for="username">Username</label>
                                <input id="username" type="text" name="username"/>
                            </p>
                            <p>
                                <label for="password">Password</label>
                                <input id="password" type="password" name="password"/>
                            </p>
                            <button type="submit">Login</button>
                        </form>
                    </div>
                    <div class="right-sign">
                        <small>Starting at</small>
                        <div class="cost">
                            <span class="cost-currency">$</span>
                            <span class="cost-dollars">20</span>
                            <span class="cost-cents">.00</span>
                        </div>
                        <a class="cta-button" href="/pricing">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.test-css {
    .flexbox-test {
        background-color: #709b90;
        height: 100%;
    }
    .menu-navigation {
        padding: 5px;
        .site-nav {
            display: flex;
            background-color: #5f4b44;
            padding: 5px;
            li {
                margin-left: 15px;
                &:first-child  {
                    margin-left: 0px;
                }
            }
            li a {
                display: block;
                padding: 5px 10px;
                color: #fff;
                background-color: #cc6b5a;
                text-decoration: none;
            }
            .nav-right-item {
                margin-left: auto;
            }
        }
    }
    .content {
        display: flex;
        margin: 10px 5px;
        .content-left {
            background-color: #fff;
            flex: 2;
        }
         .content-right {
            background-color: #fff;
            flex: 1;
        }
    }
}
</style>