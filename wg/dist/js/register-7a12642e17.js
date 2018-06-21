var randomNum;new Vue({el:"#app",data(){return{ruleForm2:{loginName:"",nickName:"",pass:"",checkPass:"",captchaCode:""},captchaImgUrl:"",checked:!0,checkError:!1,rules2:{loginName:[{required:!0,message:"please enter your email address",trigger:"blur"},{type:"email",message:"please enter your correct email address",trigger:["blur","change"]}],nickName:[{required:!0,message:"please enter your nickName",trigger:"blur"}],pass:[{validator:(e,a,r)=>{""===a?r(new Error("please enter your password")):/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(a)?(""!==this.ruleForm2.checkPass&&this.$refs.ruleForm2.validateField("checkPass"),r()):r(new Error("Need to include letters and numbers, at least 6 digits, up to 18 digits"))},trigger:"blur"}],checkPass:[{validator:(e,a,r)=>{""===a?r(new Error("please enter your password")):a!==this.ruleForm2.pass?r(new Error("The two input passwords do not match.!")):r()},trigger:"blur"}],captchaCode:[{required:!0,message:"please enter the captchaCode",trigger:"blur"}]}}},methods:{submitForm(e){this.$refs[e].validate(e=>{if(this.checked){if(this.checkError=!1,!e)return console.log("error submit!!"),!1;this.userRegister()}else this.checkError=!0})},userRegister(){var e=this;axios.post(window.pcUrl,{actionCode:"userRegister",loginName:this.ruleForm2.loginName,nickName:this.ruleForm2.nickName,loginPassword:$.md5(this.ruleForm2.pass),kaptchaNum:this.ruleForm2.captchaCode,kaptchaRandomNum:randomNum}).then(function(a){0==a.data.meta.errno?e.goToValidate(a.data):(alert(a.data.meta.msg),"SYS0018"==a.data.meta.errno&&$("#captcha").trigger("click"))}).catch(function(e){console.log(e)})},goToValidate(e){0==e.meta.errno?(localStorage.setItem("token",e.result.data.token),this.send()):alert(e.meta.msg)},send(){axios.post(window.pcUrl,{actionCode:"sendActivateMail",token:localStorage.getItem("token")}).then(function(e){location.href="userCenter.html"}).catch(function(e){console.log(e)})},getCaptchaImage(){randomNum=Math.floor(1e4*Math.random()).toString(),axios.post(window.captchaUrl,{random:randomNum}).then(e=>{this.captchaImgUrl="data:image/jpeg;base64,"+e.data.result.data.img}).catch(function(e){console.log(e)})}},created(){this.getCaptchaImage()},watch:{checked(){this.checked&&(this.checkError=!1)}}});