import SvgIcon from '@/components/SvgIcon'

export default {
    install(vue) {
			const ctx = require.context("./", false, /\.svg$/);
      ctx.keys().forEach(path => {
        const temp = path.match(/\.\/([A-Za-z0-9\-_]+)\.svg$/)
        if (!temp) return
        const name = temp[1]
        require(`@/assets/svg/${name}.svg`)
      })

      vue.component(SvgIcon.name, SvgIcon)
    },
}