export default {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow:{
        'xl-soft':'0 24px 80px -12px rgba(0,0,0,.18)',
        'card-glow':'0 20px 60px rgba(0,0,0,.30)'
      },
      keyframes:{
        gradientShift:{ 
          '0%':{backgroundPosition:'0% 50%'}, 
          '50%':{backgroundPosition:'100% 50%'}, 
          '100%':{backgroundPosition:'0% 50%'} },
        headerGlow:{ '0%,100%':{boxShadow:'0 5px 20px rgba(255,107,107,.30)'}, '50%':{boxShadow:'0 5px 30px rgba(78,205,196,.50)'} },
        floatX:{ '0%':{transform:'translateX(0)'}, '100%':{transform:'translateX(-50%)'} },
        borderGlow:{ '0%,100%':{backgroundPosition:'0% 50%'}, '50%':{backgroundPosition:'100% 50%'} },
        bounceSoft:{ '0%,100%':{transform:'translateY(0) rotate(0)'}, '50%':{transform:'translateY(-5px) rotate(10deg)'} },
      },
      animation:{
        'gradientShift': 'gradientShift 8s ease infinite',
        'header-glow':'headerGlow 3s ease-in-out infinite',
        'float-x':'floatX 20s linear infinite',
        'border-glow':'borderGlow 3s ease infinite',
        'bounce-soft':'bounceSoft 2s ease-in-out infinite',
      },
      backgroundSize:{ '200':'200% 200%', '400':'400% 400%' }
    }
  },
  plugins:[]
}
