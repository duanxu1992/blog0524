var subRouter = function (Main) {
	return [
		{
			path: '/',
			name: '',
			meta: {sign: 'IS_NOT_REQUIRE'},
			redirect: '/login'
		},
		// {
		// 	path: '/demo',
		// 	name: 'demo',
		// 	meta: {sign: 'IS_NOT_REQUIRE'},
		// 	title: 'demo',
		// 	component: () => import('main/view/main/demo')
		// },
		{
			path: '/ioms-appraisal',
			icon: 'ios-grid-view',
			// name: 'ioms-apprasial',
			title: '首页',
			meta: {sign: 'AUTH_INDEX'},
			component: Main,
			children: [
				{
					path: 'toal-score',
					title: '考核总成绩',
					meta: {sign: 'AUTH_COMPANY_MG'},
					name: 'toal-score',
					component: () => import('../view/total-score/toal-score.vue')
				},
				{
					path: 'notification-List',
					title: '考核通知公告',
					meta: {sign: 'AUTH_COMPANY_MG'},
					name: 'notification-List',
					component: () => import('../view/total-score/notification-List.vue')
				},
				{
					path: 'config',
					title: '后台配置',
					meta: {sign: 'AUTH_COMPANY_MG'},
					name: 'Backstage-config',
					component: () => import('../view/config/config.vue')
				},
				{
					path: 'zaideConfig',
					title: '载德公司数据导入',
					meta: {sign: 'AUTH_COMPANY_MG'},
					name: 'Backstage-config',
					component: () => import('../view/config/zaide-config.vue')
				},
				{
					// path: 'personal-center/:userId',
					path: 'personal-center',
					title: '个人中心',
					name: 'personal-center',
					meta: {sign: 'IS_NOT_REQUIRE'},
					icon: 'arrow-move',
					component: () => import('../view/personal-center/index')
				},
				// 视频质量
				{
					path: 'video-quality',
					title: '视频质量',
					name: 'video-quality',
					meta: {sign: 'IS_NOT_REQUIRE'},
					icon: 'arrow-move',
					component: () => import('../view/video-quality/video-quality.vue')
				},
				{
					path: 'video-quality-unqualified',
					title: '不及格数',
					name: 'unqualified-number',
					meta: {sign: 'IS_NOT_REQUIRE'},
					icon: 'arrow-move',
					component: () => import('../view/video-quality/video-quality-unqualified.vue')
				},
				//重点区域
				{
					path: 'key-area',
					title: '重点区域',
					name: 'key-area',
					meta: {sign: 'IS_NOT_REQUIRE'},
					icon: 'arrow-move',
					component: () => import('../view/key-area/key-area-home.vue')
				},
				{
					path: 'city-key-area-unqualified',
					title: '重点区域市级不合格明细',
					name: 'city-key-area-unqualified',
					meta: {sign: 'IS_NOT_REQUIRE'},
					icon: 'arrow-move',
					component: () => import('../view/key-area/city-key-area-unqualified.vue')
				},
				{
					path: '/',
					title: '404',
					name: 'ppl-detail',
					meta: {sign: 'IS_NOT_REQUIRE'},
					icon: 'arrow-move',
					component: () => import('main/view/error-page/404.vue')
				},
				//视频联网
				{
					path: 'video-networking',
					icon: 'ios-grid-view',
					name: 'video_networking',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '视频联网',
					component: () => import('../view/video-networking/video-networking.vue')
				},
				{
					path: 'video-networking-unqualify',
					name: 'video-networking-unqualify',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '视频联网不合格总计',
					component: () => import('../view/video-networking/video-networking-unqualified-total.vue')
				},
				{
					path: 'video-networking-catalog-unqualify',
					name: 'catalogDisqualify',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '视频联网目录不合格数',
					component: () => import('../view/video-networking/video-networking-catalogUnqualified.vue')
				},
				{
					path: 'video-networking-divice-unqualified',
					name: 'diviceUnqualified',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '视频联网不合格设备',
					component: () => import('../view/video-networking/video-networking-diviceUnqualified.vue')
				},
				{
					path: 'video-networking-coordinates-unqualified',
					name: 'coordinatesUnqualified',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '视频联网经纬度不合格',
					component: () => import('../view/video-networking/video-networking-coordinatesUnqualified.vue')
				},
				// 动态人像联网考核
				{
					path: 'video-bayonet',
					name: 'video-bayonet',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '视频卡口联网',
					component: () => import('../view/video-bayonet/video-bayonet.vue')
				},
				//视频卡口
				{
					path: 'video-bayonet',
					name: 'video-bayonet',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '视频卡口联网',
					component: () => import('../view/video-bayonet/video-bayonet.vue')
				},
				{
					path: 'video-bayonet-unqualify',
					name: 'video-bayonet-unqualify',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '视频卡口联网不合格总计',
					component: () => import('../view/video-networking/video-networking-unqualified-total.vue')
				},
				{
					path: 'video-bayonet-catalog-unqualify',
					name: 'video-bayonet-catalog-unqualify',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '视频卡口联网目录不合格数',
					component: () => import('../view/video-networking/video-networking-catalogUnqualified.vue')
				},
				{
					path: 'video-bayonet-divice-unqualified',
					name: 'video-bayonet-divice-unqualified',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '视频卡口联网不合格设备',
					component: () => import('../view/video-networking/video-networking-diviceUnqualified.vue')
				},
				{
					path: 'video-bayonet-coordinates-unqualified',
					name: 'video-bayonet-coordinates-unqualified',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '视频卡口联网经纬度不合格',
					component: () => import('../view/video-networking/video-networking-coordinatesUnqualified.vue')
				},
				//视频卡口质量
				{
					path: 'video-bayonet-quality',
					name: 'video-bayonet-quality',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '视频卡口质量',
					component: () => import('../view/video-bayonet-quality/video-bayonet-quality.vue')
				},
				{
					path: 'video-bayonet-quality-unqualified',
					title: '视频卡口质量不合格',
					name: 'unqualified-number',
					meta: {sign: 'IS_NOT_REQUIRE'},
					icon: 'arrow-move',
					component: () => import('../view/video-quality/video-quality-unqualified.vue')
				},
				//一机一档
				{
					path: 'bookbuilding-unqualified',
					name: 'bookbuilding-unqualified',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '一机一档建档不合格',
					component: () => import('../view/machine-gear/bookbuilding-unqualified.vue')
				},
				{
					path: 'machine-gear',
					name: 'machine-gear',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '一机一档',
					component: () => import('../view/machine-gear/machine-gear.vue')
				},
				{
					path: 'bookbuilding-coordinate-unqualified',
					name: 'bookbuilding-coordinate-unqualified',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '一机一档建档坐标不合格',
					component: () => import('../view/machine-gear/bookbuilding-coordinate-unqualified.vue')
				},
				{
					path: 'coordinate-unqualified',
					name: 'coordinate-unqualified',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '一机一档坐标不合格',
					component: () => import('../view/machine-gear/coordinate-unqualified.vue')
				},
				//智能卡口
				{
					path: 'intelligence-bayonet',
					name: 'intelligence-bayonet',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '智能卡口',
					component: () => import('../view/intelligence-bayonet/intelligence-bayonet-home.vue')
				},
				//智能卡口不合格页面
				{
					path: 'intelligence-bayonet-unqualified',
					name: 'intelligence-bayonet-unqualified',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '智能卡口不合格',
					component: () => import('../view/intelligence-bayonet/intelligence-bayonet-unqualified.vue')
				},
				//平台稳定性
				{
					path: 'platform-status',
					name: 'platform-status',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '平台稳定性',
					component: () => import('../view/platform-status/platform-status.vue')
				},
				//平台稳定性明细
				{
					path: 'platform-status-offlinedetail',
					name: 'platform-status-offlinedetail',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '平台稳定性明细',
					component: () => import('../view/platform-status/platform-status-offlinedetail.vue')
				},
				//平台稳定性报备历史
				{
					path: 'platform-status-offline-reporthistory',
					name: 'platform-status-offline-reporthistory',
					meta: {sign: 'IS_NOT_REQUIRE'},
					title: '平台稳定性报备历史',
					component: () => import('../view/platform-status/offline-reporthistory.vue')
				}
			]
		}
	];
};
export default subRouter;
