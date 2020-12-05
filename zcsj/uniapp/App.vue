<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.updateManager()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			updateManager(){
			  const updateManager = uni.getUpdateManager()
			  updateManager.onUpdateReady(function () {
			    uni.showModal({
			      title: '更新提示',
			      content: '新版本已经准备好，是否重启应用？',
			      success(res) {
			        if (res.confirm) {
			          updateManager.applyUpdate()
			        }
			      }
			    })
			  })
			},
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	page{
		background-color: #f7f9fb;
	}
</style>
