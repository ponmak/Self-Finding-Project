<template>
<div>
    <div class="container">
        <div class="card">
            <div class="face face1">
                <div class="content">
                    <img class="img-MBTI" src="../assets/img/MBTI.png">
                    <h3>MBTI</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content" v-for="item, index in resdata.mbti" :key="index">
                    <p>คณะที่ {{ index }} : {{ item.faculty }} {{ item.percent }} </p>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="face face1">
                <div class="content">
                    <img class="img-IQ" src="../assets/img/IQ.png">
                    <h3>IQ</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content" v-for="item, index in resdata.iq" :key="index">
                    <p>คณะที่ {{ index }} : {{ item.faculty }} {{ item.percent }} </p>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="face face1">
                <div class="content">
                    <img class="img-EQ" src="../assets/img/EQ.png">
                    <h3>EQ</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content" v-for="item, index in resdata.eq" :key="index">
                    <p>คณะที่ {{ index }} : {{ item.faculty }} {{ item.percent }} </p>
                </div>
            </div>
        </div>
    </div>
    <div class="header">
        <h1>คณะที่เข้ากับคุณ</h1>
    </div>
    <div class="row1-container mb-8">
        <div class="box box-down cyan">
            <h2>คณะที่ 1 {{ resdata.final[0].faculty }}</h2>
            <p> {{ resdata.final[0].percent }} </p>
            <img class="banner" src="https://assets.codepen.io/2301174/icon-supervisor.svg" alt="">
        </div>

        <div class="box red">
            <h2>คณะที่ 2 {{ resdata.final[1].faculty }}</h2>
            <p> {{ resdata.final[1].percent }} </p>
            <img class="banner" src="https://assets.codepen.io/2301174/icon-team-builder.svg" alt="">
        </div>

        <div class="box box-down blue">
            <h2>คณะที่ 3 {{ resdata.final[2].faculty }}</h2>
            <p> {{ resdata.final[2].percent }} </p>
            <img class="banner" src="https://assets.codepen.io/2301174/icon-calculator.svg" alt="">
        </div>
    </div>

</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            resdata: [],
            getdata: []
        }
    },
    async created() {
        this.getdata = JSON.parse(sessionStorage.getItem("user"))

        let body = {
            mbti: this.getdata.mbti,
            iq: this.getdata.iq,
            eq: this.getdata.eq,
            faculty: this.getdata.faculty,
        }
        await axios.post("/api/_swk/dataset/processFilter", body).then(response => {
            this.resdata = response
        }).catch(error => {

        });

        setTimeout(() => {
            if (this.getdata.status == 0) {

                sessionStorage.removeItem("user").status

                axios.post("/api/_swk/dataset/newdataset", body).then(response => {
                    let databody = {
                        id: this.getdata.id,
                        username: this.getdata.username,
                        result: this.getdata[0].faculty
                    }

                    axios.post("/api/_swk/history/newHistory", databody).then(response => {

                    }).catch(error => {});

                }).catch(error => {});
            }

        }, 5000)

    },
    methods: {

    },
}
</script>

<style scoped>
/* body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: consolas;
} */

.container {
    width: 1000px;
    position: relative;
    display: flex;
    justify-content: space-between;
}

.container .card {
    position: relative;
    cursor: pointer;
}

.container .card .face {
    width: 300px;
    height: 200px;
    transition: 0.5s;
}

.container .card .face.face1 {
    position: relative;
    background: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    transform: translateY(100px);
}

.container .card:hover .face.face1 {
    background: #ff0057;
    transform: translateY(0);
}

.container .card .face.face1 .content {
    opacity: 0.2;
    transition: 0.5s;
}

.container .card:hover .face.face1 .content {
    opacity: 1;
}

/* .container .card .face.face1 .content img {
    max-width: 100px;
} */

.container .card .face.face1 .content h3 {
    margin: 10px 0 0;
    padding: 0;
    color: #fff;
    text-align: center;
    font-size: 1.5em;
}

.container .card .face.face2 {
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 10px 10px 5px #bdbdbd;
    transform: translateY(-100px);
}

.container .card:hover .face.face2 {
    transform: translateY(0);
}

.container .card .face.face2 .content p {
    margin: 0;
    padding: 0;
}

.container .card .face.face2 .content a {
    margin: 15px 0 0;
    display: inline-block;
    text-decoration: none;
    font-weight: 900;
    color: #333;
    padding: 5px;
    border: 1px solid #333;
}

.container .card .face.face2 .content a:hover {
    background: #333;
    color: #fff;
}

.img-MBTI {
    width: 145px !important;
}

.img-IQ {
    width: 110px !important;
    height: 110px !important;
}

.img-EQ {
    height: 122px !important;
}

.attribution {
    font-size: 11px;
    text-align: center;
}

.attribution a {
    color: hsl(228, 45%, 44%);
}

h1:first-of-type {
    font-weight: var(--weight1);
    color: var(--varyDarkBlue);

}

h1:last-of-type {
    color: var(--varyDarkBlue);
}

@media (max-width: 400px) {
    h1 {
        font-size: 1.5rem;
    }
}

.header {
    text-align: center;
    line-height: 0.8;
    margin-bottom: 50px;
    margin-top: 100px;
}

.header p {
    margin: 0 auto;
    line-height: 2;
    color: var(--grayishBlue);
}

.box p {
    color: var(--grayishBlue);
}

.box {
    border-radius: 5px;
    box-shadow: 0px 30px 40px -20px var(--grayishBlue);
    padding: 30px;
    margin: 20px;
}

img.banner {
    float: right;
}

@media (max-width: 450px) {
    .box {
        height: 200px;
    }
}

@media (max-width: 950px) and (min-width: 450px) {
    .box {
        text-align: center;
        height: 180px;
    }
}

.cyan {
    border-top: 3px solid var(--cyan);
}

.red {
    border-top: 3px solid var(--red);
}

.blue {
    border-top: 3px solid var(--blue);
}

.orange {
    border-top: 3px solid var(--orange);
}

h2 {
    color: var(--varyDarkBlue);
    font-weight: var(--weight3);
}

@media (min-width: 950px) {
    .row1-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .row2-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box-down {
        position: relative;
        top: 150px;
    }

    .box {
        width: 20%;

    }

    .header p {
        width: 30%;
    }

}
</style>
