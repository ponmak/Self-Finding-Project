<template>
    <div class="main-container">
        <div class="cards">
            <div class="card card-1">
                <div class="card__icon"><i class="fas fa-bolt"></i></div>
                <p class="card__exit"><i class="fas fa-times"></i></p>
                <h2 class="card__title">Your Personality</h2>
                <form id="app-cover">
                    <v-select 
                        clearable 
                        label="Personality"
                        :items="mbti"
                        v-model="info.mbti"
                        solo
                    ></v-select>
                </form>
            </div>
            <div class="card card-2">
                <div class="card__icon"><i class="fas fa-bolt"></i></div>
                <p class="card__exit"><i class="fas fa-times"></i></p>
                <h2 class="card__title">ระดับ IQ</h2>
                <form id="app-cover">
                    <v-select 
                        clearable 
                        label="IQ"
                        :items="iq"
                        v-model="info.iq"
                        solo
                    ></v-select>
                </form>
            </div>
            <div class="card card-3">
                <div class="card__icon"><i class="fas fa-bolt"></i></div>
                <p class="card__exit"><i class="fas fa-times"></i></p>
                <h2 class="card__title">ระดับ EQ</h2>
                <form id="app-cover">
                    <v-select 
                        clearable 
                        label="EQ"
                        :items="eq"
                        v-model="info.eq"
                        solo
                    ></v-select>
                </form>
            </div>
            <div class="card card-4">
                <div class="card__icon"><i class="fas fa-bolt"></i></div>
                <p class="card__exit"><i class="fas fa-times"></i></p>
                <h2 class="card__title">คณะที่สนใจ </h2>
                <form id="app-cover">
                    <v-select 
                        clearable 
                        label="คณะที่สนใจ"
                        :items="faculty"
                        v-model="info.faculty"
                        solo
                    ></v-select>
                </form>
            </div>
        </div>
        <div class="btn-control">
            <button class="button-75" role="button"><span class="text">Summit</span></button>
        </div>
</div>
</template>
    
        
        
<script>
import axios from 'axios'
export default {
    name: 'IndexPage',
    data() {
        return {
            mbti: ['INTP', 'INTJ', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'],
            iq: [],
            eq: ['ดี', 'เก่ง', 'สุข'],
            faculty: ["คณะนิติศาสตร์",'คณะมนุษยศาสตร์',"คณะสื่อมวลชน","คณะวิจิตรศิลป์","คณะวิศวกรรมศาสตร์","คณะบริหารธุรกิจ","คณะวิทยาศาสตร์","คณะเศรษฐศาสตร์","คณะศิลปกรรม","คณะอุตสาหกรรมศิลป์","คณะสถาปัตยกรรม","คณะอักษรศาสตร์","คณะศิลปศาสตร์","คณะรัฐศาสตร์","คณะนิเทศศาสตร์","คณะสังคมสงเคราะห์ศาสตร์","คณะสังคม","คณะศิลปะศาสตร์","คณะพยาบาลศาสตร์","คณะครุศาสตร์หรือศึกษาศาสตร์","คณะเทคนิคการแพทย์","คณะครุศาสตร์","คณะสาธารณสุขศาสตร์","คณะสื่อสารมวลชน","คณะพาณิชยศาสตร์","คณะคหกรรมศาสตร์","คณะศิลปกรรมศาสตร์","คณะอุตสาหกรรมเกษตร","คณะการสื่อสารมวลชน","คณะทันตแพทยศาสตร์","คณะศึกษาศาสตร์","คณะสถาปัตยกรรมศาสตร์","คณะแพทยศาสตร์"],
            info: {mbti:'',iq:'',eq:'',faculty:'',status: 0}
        }
    },
    async created() {
        let array = Array.from({ length: 71 }, (_, i) => i + 80);
        this.iq = array
        await axios.post("/api/_swk/dataset/faculty").then(response => {
                this.faculty = response
            }).catch(error => {
                
            });
    },
    methods: {
        async onsubmit(){
            if(this.info.mbti != '' && this.info.iq != '' && this.info.eq != '' && this.info.faculty != ''){
                sessionStorage.setItem("user", JSON.stringify(this.info));
                this.$router.push({
                    path: '/display'
                });
            }else{
                this.$toast.error('ระบุข้อมูล !').goAway(1000);
            }
        }

    }
}
</script>
        
        
<style scoped>
/* class use . */
/* id use # */

.main-container {
    padding: 30px;
}

/* HEADING */

.heading {
    text-align: center;
}

.heading__title {
    font-weight: 600;
}

.heading__credits {
    margin: 10px 0px;
    color: #888888;
    font-size: 25px;
    transition: all 0.5s;
}

.heading__link {
    text-decoration: none;
}

.heading__credits .heading__link {
    color: inherit;
}

/* CARDS */

.cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.card {
    margin: 20px;
    padding: 20px;
    width: 500px;
    min-height: 200px;
    display: grid;
    grid-template-rows: 20px 50px 1fr 50px;
    border-radius: 10px;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
    transition: all 0.2s;
}

.card:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
    transform: scale(1.01);
}

.card__link,
.card__exit,
.card__icon {
    position: relative;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.9);
}

.card__link::after {
    position: absolute;
    top: 25px;
    left: 0;
    content: "";
    width: 0%;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.6);
    transition: all 0.5s;
}

.card__link:hover::after {
    width: 100%;
}

.card__exit {
    grid-row: 1/2;
    justify-self: end;
}

.card__icon {
    grid-row: 2/3;
    font-size: 30px;
}

.card__title {
    grid-row: 3/4;
    font-weight: 400;
    color: #ffffff;
}

.card__apply {
    grid-row: 4/5;
    align-self: center;
}

/* CARD BACKGROUNDS */

.card-1 {
    background: radial-gradient(#1fe4f5, #3fbafe);
}

.card-2 {
    background: radial-gradient(#fbc1cc, #fa99b2);
}

.card-3 {
    background: radial-gradient(#76b2fe, #b69efe);
}

.card-4 {
    background: radial-gradient(#60efbc, #58d5c9);
}

/* RESPONSIVE */

@media (max-width: 1600px) {
    .cards {
        justify-content: center;
    }
}

.btn-control {
    display: flex;
    justify-content: center;
}

/* CSS */
.button-75 {
    align-items: center;
    background-image: linear-gradient(135deg, #f34079 40%, #fc894d);
    border: 0;
    border-radius: 10px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    font-family: "Codec cold", sans-serif;
    font-size: 16px;
    font-weight: 700;
    height: 54px;
    justify-content: center;
    letter-spacing: .4px;
    line-height: 1;
    max-width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 3px;
    text-decoration: none;
    text-transform: uppercase;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.button-75:active {
    outline: 0;
}

.button-75:hover {
    outline: 0;
}

.button-75 span {
    transition: all 200ms;
}

.button-75:hover span {
    transform: scale(.9);
    opacity: .75;
}

@media screen and (max-width: 991px) {
    .button-75 {
        font-size: 15px;
        height: 50px;
    }

    .button-75 span {
        line-height: 50px;
    }
}

.brd {
    height: 40px !important;
    border: 1px solid #e2eded;
    border-color: #eaf1f1 #e4eded #dbe7e7 #e4eded;
}

#info {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    color: #2d3667;
    font-size: 16px;
    text-align: center;
    padding: 14px;
    background-color: #f3f9f9;
}

/* #app-cover {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          width: 300px;
          height: 42px;
          margin: 100px auto 0 auto;
          z-index: 1;
        } */

#select-button {
    position: relative;
    height: 16px;
    padding: 12px 14px;
    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;
}

#options-view-button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
}

#selected-value {
    font-size: 16px;
    line-height: 1;
    margin-right: 26px;
}

.option i {
    width: 16px;
    height: 16px;
}

.option,
.label {
    color: #2d3667;
    font-size: 16px;
}

#chevrons {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 12px;
    padding: 9px 14px;
}

#chevrons i {
    display: block;
    height: 50%;
    color: #d1dede;
    font-size: 12px;
    text-align: right;
}

#options-view-button:checked+#select-button #chevrons i {
    color: #2d3667;
}

.options {
    position: absolute;
    left: 0;
    width: 250px;
}

#options {
    position: relative;
    /* top: 42px; */
    right: 0;
    left: 0;
    /* width: 298px; */
    margin: 0 auto;
    background-color: #fff;
    border-radius: 4px;
}

#options-view-button:checked~#options {
    border: 1px solid #e2eded;
    border-color: #eaf1f1 #e4eded #dbe7e7 #e4eded;
}

.option {
    position: relative;
    line-height: 1;
    transition: 0.3s ease all;
    z-index: 2;
}

.option i {
    position: absolute;
    left: 14px;
    padding: 0;
    display: none;
}

#options-view-button:checked~#options .option i {
    display: block;
    padding: 12px 0;
}

.label {
    display: none;
    padding: 0;
    margin-left: 27px;
}

#options-view-button:checked~#options .label {
    display: block;
    padding: 12px 14px;
}

.s-c {
    position: absolute;
    left: 0;
    width: 100%;
    height: 50%;
}

.s-c.top {
    top: 0;
}

.s-c.bottom {
    bottom: 0;
}

input[type="radio"] {
    position: absolute;
    right: 0;
    left: 0;
    width: 100%;
    height: 50%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
}

.s-c:hover~i {
    color: #fff;
    opacity: 0;
}

.s-c:hover {
    height: 100%;
    z-index: 1;
}

.s-c.bottom:hover+i {
    bottom: -25px;
    animation: moveup 0.3s ease 0.1s forwards;
}

.s-c.top:hover~i {
    top: -25px;
    animation: movedown 0.3s ease 0.1s forwards;
}

@keyframes moveup {
    0% {
        bottom: -25px;
        opacity: 0;
    }

    100% {
        bottom: 0;
        opacity: 1;
    }
}

@keyframes movedown {
    0% {
        top: -25px;
        opacity: 0;
    }

    100% {
        top: 0;
        opacity: 1;
    }
}
</style>
    