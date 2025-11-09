<template>
  <main id="home">
    <!-- HERO -->
    <section class="hero" id="inicio">
      <div class="hero-content">
        <h1>Educación Financiera que crece con tus hijos</h1>
        <p class="subtitle">
          El primer ecosistema adaptativo del Perú que transforma la educación financiera en una
          aventura familiar desde los 6 hasta los 17 años.
        </p>
        <div class="free-badge">Totalmente Gratuito • Sin Costo Alguno</div>

        <div class="hero-features">
          <div class="hero-feature">11 años de aprendizaje continuo</div>
          <div class="hero-feature">9 niveles progresivos</div>
          <div class="hero-feature">IA personalizada</div>
        </div>

        <div class="cta-buttons">
          <router-link :to="{ name: 'register' }" class="cta-button">Registrarme Ahora</router-link>
          <router-link :to="{ name: 'home', hash: '#etapas' }" class="cta-button cta-button-secondary">
            Conocer Más
          </router-link>
        </div>
      </div>
    </section>

    <!-- ¿POR QUÉ DIFERENTE? -->
    <section class="section" id="caracteristicas">
      <h2 class="section-title">¿Por qué Riqch'ariy es diferente?</h2>
      <p class="section-subtitle">
        Un ecosistema completo diseñado para evolucionar con cada etapa del desarrollo de tus hijos
      </p>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3>Aprendizaje Progresivo</h3>
          <p>9 niveles de dificultad que evolucionan cada año, asegurando contenido siempre fresco y desafiante para cada edad.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">👨‍👩‍👧‍👦</div>
          <h3>Integración Familiar</h3>
          <p>Padres, hijos y educadores conectados en un ecosistema que transforma el aprendizaje en experiencia compartida.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🤖</div>
          <h3>IA Adaptativa</h3>
          <p>Tecnología que personaliza el contenido según el ritmo, edad y contexto socioeconómico de cada estudiante.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🦙</div>
          <h3>100% Peruano</h3>
          <p>Referencias culturales, casos reales y escenarios diseñados específicamente para la realidad peruana.</p>
        </div>
      </div>
    </section>

    <!-- ETAPAS -->
    <section class="section stages-section" id="etapas">
      <h2 class="section-title">Un Viaje de 11 Años en 3 Etapas</h2>
      <p class="section-subtitle">Cada etapa contiene 3 niveles únicos que mantienen el aprendizaje fresco y motivador año tras año</p>

      <div class="stages-wrapper">
        <!-- ETAPA 1 -->
        <div class="stage-container">
          <div class="stage-header">
            <div class="stage-number">1</div>
            <div class="stage-info">
              <span class="stage-badge">ETAPA SEMILLA 🌱</span>
              <h3>Descubriendo el Valor</h3>
              <p class="stage-age">6 - 9 años • 3 niveles progresivos</p>
            </div>
          </div>
          <div class="stage-description">
            <p><strong>Objetivo:</strong> Construir las bases del pensamiento financiero a través del juego y la experimentación guiada. Los niños aprenden conceptos fundamentales mediante actividades lúdicas adaptadas a su desarrollo cognitivo.</p>
          </div>
          <div class="levels-grid">
            <div class="level-card">
              <div class="level-header">
                <div class="level-icon">🌱</div>
                <div class="level-title">
                  <h4>Nivel 1: El Explorador</h4>
                  <p class="level-age">6-7 años</p>
                </div>
              </div>
              <ul class="level-features">
                <li>Identificar monedas y billetes peruanos</li>
                <li>Distinguir entre necesidad y deseo</li>
                <li>Juego "La Tiendita Mágica"</li>
                <li>Primera alcancía virtual</li>
              </ul>
            </div>
            <div class="level-card">
              <div class="level-header">
                <div class="level-icon">🌿</div>
                <div class="level-title">
                  <h4>Nivel 2: El Coleccionista</h4>
                  <p class="level-age">7-8 años</p>
                </div>
              </div>
              <ul class="level-features">
                <li>Concepto básico de ahorro</li>
                <li>Sumar y restar dinero</li>
                <li>Juego "Mi Primer Ahorro"</li>
                <li>Metas de ahorro semanales</li>
              </ul>
            </div>
            <div class="level-card">
              <div class="level-header">
                <div class="level-icon">🪴</div>
                <div class="level-title">
                  <h4>Nivel 3: El Planificador</h4>
                  <p class="level-age">8-9 años</p>
                </div>
              </div>
              <ul class="level-features">
                <li>Planificar compras simples</li>
                <li>Valor del trabajo (tareas)</li>
                <li>Juego "La Feria del Sol"</li>
                <li>Decisiones: gastar vs. ahorrar</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- ETAPA 2 -->
        <div class="stage-container">
          <div class="stage-header">
            <div class="stage-number">2</div>
            <div class="stage-info">
              <span class="stage-badge">ETAPA BROTE 🌳</span>
              <h3>Practicando la Gestión</h3>
              <p class="stage-age">10 - 13 años • 3 niveles progresivos</p>
            </div>
          </div>
          <div class="stage-description">
            <p><strong>Objetivo:</strong> Desarrollar habilidades prácticas de gestión financiera mediante simulaciones realistas. Los pre-adolescentes aprenden a tomar decisiones más complejas y comprender consecuencias económicas.</p>
          </div>
          <div class="levels-grid">
            <div class="level-card">
              <div class="level-header">
                <div class="level-icon">🌳</div>
                <div class="level-title">
                  <h4>Nivel 4: El Emprendedor</h4>
                  <p class="level-age">10-11 años</p>
                </div>
              </div>
              <ul class="level-features">
                <li>Simulador "Mi Kiosco Escolar"</li>
                <li>Presupuesto mensual básico</li>
                <li>Concepto de ganancia vs. gasto</li>
                <li>"El Reto del Sol" (introducción)</li>
              </ul>
            </div>
            <div class="level-card">
              <div class="level-header">
                <div class="level-icon">🌲</div>
                <div class="level-title">
                  <h4>Nivel 5: El Estratega</h4>
                  <p class="level-age">11-12 años</p>
                </div>
              </div>
              <ul class="level-features">
                <li>Ahorro para metas a mediano plazo</li>
                <li>Comparar precios y ofertas</li>
                <li>Simulador "La Bodega del Barrio"</li>
                <li>Introducción a ingresos/egresos</li>
              </ul>
            </div>
            <div class="level-card">
              <div class="level-header">
                <div class="level-icon">🎋</div>
                <div class="level-title">
                  <h4>Nivel 6: El Administrador</h4>
                  <p class="level-age">12-13 años</p>
                </div>
              </div>
              <ul class="level-features">
                <li>Presupuesto personal avanzado</li>
                <li>Concepto de inversión básica</li>
                <li>Simulador "Mi Propina Inteligente"</li>
                <li>Primeras decisiones financieras</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- ETAPA 3 -->
        <div class="stage-container">
          <div class="stage-header">
            <div class="stage-number">3</div>
            <div class="stage-info">
              <span class="stage-badge">ETAPA ÁRBOL 🏛️</span>
              <h3>Planificando el Futuro</h3>
              <p class="stage-age">14 - 17 años • 3 niveles progresivos</p>
            </div>
          </div>
          <div class="stage-description">
            <p><strong>Objetivo:</strong> Preparar a los adolescentes para la vida financiera adulta con conocimientos avanzados. Desarrollan pensamiento crítico sobre finanzas, inversiones y ciberseguridad en el mundo digital.</p>
          </div>
          <div class="levels-grid">
            <div class="level-card">
              <div class="level-header">
                <div class="level-icon">🌳</div>
                <div class="level-title">
                  <h4>Nivel 7: El Analista</h4>
                  <p class="level-age">14-15 años</p>
                </div>
              </div>
              <ul class="level-features">
                <li>Interés simple y compuesto</li>
                <li>Concepto de crédito y TCEA</li>
                <li>Simulador "Mi Primera Chamba"</li>
                <li>Asistente IA "YACHAQ"</li>
              </ul>
            </div>
            <div class="level-card">
              <div class="level-header">
                <div class="level-icon">🌴</div>
                <div class="level-title">
                  <h4>Nivel 8: El Inversionista</h4>
                  <p class="level-age">15-16 años</p>
                </div>
              </div>
              <ul class="level-features">
                <li>Inversión básica y riesgos</li>
                <li>Bolsa de valores simplificada</li>
                <li>Planificación a largo plazo</li>
                <li>Simulador "Mi Portfolio"</li>
              </ul>
            </div>
            <div class="level-card">
              <div class="level-header">
                <div class="level-icon">🏛️</div>
                <div class="level-title">
                  <h4>Nivel 9: El Ciudadano Financiero</h4>
                  <p class="level-age">16-17 años</p>
                </div>
              </div>
              <ul class="level-features">
                <li>Ciberseguridad "Cuidado con el Cuy Mágico"</li>
                <li>Evitar estafas y fraudes</li>
                <li>Planificación universitaria</li>
                <li>Preparación para vida adulta</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MÓDULO FAMILIA -->
    <section class="family-module" id="familia">
      <div class="family-content">
        <div class="family-intro">
          <h2>🏠 El Nido Financiero 💝</h2>
          <p>Porque la mejor educación financiera comienza en casa. Empodera a toda tu familia para construir un futuro próspero juntos.</p>
        </div>
        <div class="family-features">
          <div class="family-feature">
            <div class="family-feature-icon">📊</div>
            <h3>Panel de Control Parental</h3>
            <p>Monitorea el progreso de tus hijos en tiempo real, identifica fortalezas y áreas de mejora con reportes detallados.</p>
          </div>

          <div class="family-feature">
            <div class="family-feature-icon">🎯</div>
            <h3>Metas de Ahorro Familiares</h3>
            <p>Creen objetivos compartidos como “Vacaciones en familia” donde todos aportan y celebran juntos el logro.</p>
          </div>

          <div class="family-feature">
            <div class="family-feature-icon">✅</div>
            <h3>Gestor de Tareas y Recompensas</h3>
            <p>Asigna responsabilidades del hogar con recompensas virtuales para que aprendan a gestionar sabiamente.</p>
          </div>

          <div class="family-feature">
            <div class="family-feature-icon">💡</div>
            <h3>Guía Inteligente para Padres</h3>
            <p>La IA sugiere temas de conversación y consejos para explicar conceptos financieros en el momento perfecto.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-item">
          <h3>6-17</h3>
          <p>Años de cobertura educativa</p>
        </div>
        <div class="stat-item">
          <h3>4</h3>
          <p>Módulos integrados</p>
        </div>
        <div class="stat-item">
          <h3>100%</h3>
          <p>Personalizado con IA</p>
        </div>
        <div class="stat-item">
          <h3>∞</h3>
          <p>Impacto generacional</p>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>¿Listo para transformar el futuro financiero de tu familia?</h2>
        <p>Únete a miles de familias peruanas que ya están construyendo una cultura de bienestar financiero.</p>
        <h1 class="cta-accent">✨ 100% Gratuito • Para Siempre ✨</h1>
        <div class="cta-buttons">
          <router-link :to="{ name: 'register' }" class="cta-button">Crear Cuenta Gratis 🚀</router-link>
          <router-link :to="{ name: 'home', hash: '#caracteristicas' }" class="cta-button cta-button-secondary">
            Conocer Más 💫
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
// sin lógica por ahora
</script>

<style scoped>
/* Base del contenedor (antes estaba en body) */
#home{
  font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
  line-height:1.6;
  color:#2c3e50;
  overflow-x:hidden;
  background:linear-gradient(to bottom,#FFF9F0 0%,#FFE8CC 50%,#E0F7F5 100%);
}

/* HERO */
.hero{
  background:linear-gradient(135deg,#FF6B6B 0%,#4ECDC4 50%,#FFE66D 100%);
  background-size:400% 400%;
  color:#fff;
  padding:80px 2rem 70px;
  text-align:center;
  position:relative;
  overflow:hidden;
  animation:gradientShift 8s ease infinite;
}
.hero::before{
  content:'⭐🌟✨💫🎯🚀🎈🎉⭐🌟✨💫🎯🚀🎈🎉⭐🌟✨💫🎯🚀🎈🎉';
  position:absolute; font-size:3rem; top:15%; left:-10%; width:120%;
  animation:floatStars 20s linear infinite; opacity:.3; white-space:nowrap;
}
.hero-content{max-width:900px;margin:0 auto;position:relative;z-index:1;}
.hero h1{
  font-family:'Segoe UI Black','Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
  font-weight:800;              /* fuerza peso máximo disponible */
  letter-spacing:-.5px;         /* se ve más compacto y robusto */
  font-size:3.5rem;
  margin-bottom:1.5rem;
  line-height:1.2;
  text-shadow:3px 3px 6px rgba(0,0,0,.3);
  animation:fadeInUp .8s ease-out;
}
.subtitle{font-size:1.4rem;margin-bottom:1rem;opacity:.95;animation:fadeInUp .8s ease-out .2s backwards;line-height:1.8;text-shadow:2px 2px 4px rgba(0,0,0,.2);}

.free-badge{
  display:inline-block;background:linear-gradient(135deg,#FF8E53 0%,#FFD93D 100%);color:#fff;
  padding:.8rem 2rem;border-radius:50px;font-size:1.2rem;font-weight:700;margin-bottom:2rem;
  animation:wiggle 1s ease-in-out infinite;box-shadow:0 5px 20px rgba(255,142,83,.5);text-shadow:2px 2px 4px rgba(0,0,0,.2);
}
.hero-features{display:flex;justify-content:center;gap:3rem;margin:2rem 0;flex-wrap:wrap;animation:fadeInUp .8s ease-out .4s backwards;}
.hero-feature{display:flex;align-items:center;gap:.5rem;font-size:1.1rem;background:rgba(255,255,255,.2);padding:.8rem 1.5rem;border-radius:30px;backdrop-filter:blur(10px);box-shadow:0 3px 10px rgba(0,0,0,.1);}
.hero-feature::before{content:'✨';font-size:1.5rem;animation:spin 3s linear infinite;}
.cta-buttons{display:flex;gap:1rem;justify-content:center;margin-top:2rem;animation:fadeInUp .8s ease-out .6s backwards;flex-wrap:wrap;}
.cta-button{
  display:inline-block;background:linear-gradient(135deg,#FFD93D 0%,#FFA500 100%);color:#2c3e50;
  padding:1.2rem 3rem;border-radius:50px;text-decoration:none;font-weight:900;font-size:1.2rem;
  transition:transform .3s,box-shadow .3s;box-shadow:0 6px 25px rgba(255,165,0,.4);
}
.cta-button:hover{transform:translateY(-5px) scale(1.05);box-shadow:0 12px 35px rgba(255,165,0,.6);}
.cta-button-secondary{background:linear-gradient(135deg,#95E1D3 0%,#38EF7D 100%);color:#fff;text-shadow:2px 2px 4px rgba(0,0,0,.2);}

/* Secciones comunes */
.section{padding:100px 2rem;max-width:1200px;margin:0 auto;}
.section-title{
  font-size:2.8rem;text-align:center;margin-bottom:1rem;
  background:linear-gradient(135deg,#FF6B6B 0%,#4ECDC4 50%,#FFE66D 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:900;position:relative;
}
.section-subtitle{text-align:center;font-size:1.2rem;color:#7f8c8d;margin-bottom:4rem;max-width:700px;margin-left:auto;margin-right:auto;}
.section-title::after{
  content:'';display:block;width:120px;height:6px;
  background:linear-gradient(90deg,#FF6B6B,#4ECDC4,#FFE66D,#FF6B6B);
  background-size:300% 300%;animation:gradientMove 3s ease infinite;margin:1rem auto 0;border-radius:3px;
}

/* Tarjetas de características */
.features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2.5rem;margin-top:3rem;justify-items:center;}
.features-grid .feature-card:last-child{grid-column:1 / -1;max-width:350px;}
.feature-card{
  background:#fff;padding:2.5rem;border-radius:25px;box-shadow:0 8px 25px rgba(0,0,0,.1);
  transition:transform .3s,box-shadow .3s;text-align:center;border:3px solid transparent;width:100%;max-width:350px;position:relative;overflow:hidden;
}
.feature-card::before{
  content:'';position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;
  background:linear-gradient(45deg,#FF6B6B,#4ECDC4,#FFE66D,#FF6B6B);background-size:400%;
  border-radius:25px;z-index:-1;animation:borderGlow 3s ease infinite;opacity:0;transition:opacity .3s;
}
.feature-card:hover::before{opacity:1;}
.feature-card:hover{transform:translateY(-10px) scale(1.02);box-shadow:0 15px 40px rgba(0,0,0,.2);}
.feature-icon{
  width:90px;height:90px;background:linear-gradient(135deg,#FF6B6B 0%,#FFE66D 100%);border-radius:20px;
  display:flex;align-items:center;justify-content:center;font-size:2.8rem;margin:0 auto 1.5rem;
  animation:float 3s ease-in-out infinite;box-shadow:0 5px 20px rgba(255,107,107,.3);
}
.feature-card:nth-child(2) .feature-icon{background:linear-gradient(135deg,#4ECDC4 0%,#95E1D3 100%);animation-delay:.5s;}
.feature-card:nth-child(3) .feature-icon{background:linear-gradient(135deg,#FFD93D 0%,#FF8E53 100%);animation-delay:1s;}
.feature-card:nth-child(4) .feature-icon{background:linear-gradient(135deg,#A8E6CF 0%,#38EF7D 100%);animation-delay:1.5s;}
.feature-card h3{font-size:1.6rem;margin-bottom:1rem;color:#2c3e50;font-weight:700;}
.feature-card p{color:#7f8c8d;line-height:1.8;font-size:1.05rem;}

/* Etapas */
.stages-section{background:linear-gradient(180deg,#E0F7F5 0%,#FFF9F0 100%);}
.stages-wrapper{display:flex;flex-direction:column;gap:4rem;}
.stage-container{background:#fff;border-radius:30px;padding:3rem;box-shadow:0 10px 40px rgba(0,0,0,.15);transition:transform .3s;border:4px solid;position:relative;}
.stage-container:hover{transform:scale(1.02);}
.stage-container:nth-child(1){border-color:#FF6B6B;background:linear-gradient(to bottom right,#fff,#FFE8E8);}
.stage-container:nth-child(2){border-color:#4ECDC4;background:linear-gradient(to bottom right,#fff,#E0F7F5);}
.stage-container:nth-child(3){border-color:#FFD93D;background:linear-gradient(to bottom right,#fff,#FFF5D9);}
.stage-header{display:flex;align-items:center;gap:2rem;margin-bottom:2rem;flex-wrap:wrap;}
.stage-number{
  width:90px;height:90px;background:linear-gradient(135deg,#FF6B6B 0%,#FF8E53 100%);
  border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:3rem;color:#fff;font-weight:900;flex-shrink:0;
  box-shadow:0 5px 20px rgba(255,107,107,.4);animation:numberPulse 2s ease-in-out infinite;
}
.stage-container:nth-child(2) .stage-number{background:linear-gradient(135deg,#4ECDC4 0%,#38EF7D 100%);box-shadow:0 5px 20px rgba(78,205,196,.4);}
.stage-container:nth-child(3) .stage-number{background:linear-gradient(135deg,#FFD93D 0%,#FFA500 100%);box-shadow:0 5px 20px rgba(255,165,0,.4);}
.stage-info{flex:1;}
.stage-badge{
  display:inline-block;background:linear-gradient(135deg,#FF6B6B 0%,#FF8E53 100%);color:#fff;padding:.7rem 2rem;border-radius:30px;
  font-weight:800;margin-bottom:.5rem;font-size:1rem;box-shadow:0 3px 10px rgba(255,107,107,.3);text-shadow:1px 1px 2px rgba(0,0,0,.2);
}
.stage-container:nth-child(2) .stage-badge{background:linear-gradient(135deg,#4ECDC4 0%,#38EF7D 100%);}
.stage-container:nth-child(3) .stage-badge{background:linear-gradient(135deg,#FFD93D 0%,#FFA500 100%);}
.stage-info h3{font-size:2.2rem;margin-bottom:.5rem;color:#2c3e50;font-weight:800;}
.stage-age{color:#7f8c8d;font-size:1.2rem;font-weight:600;}
.stage-description{background:rgba(255,255,255,.7);padding:1.5rem;border-radius:15px;margin:2rem 0;border-left:6px solid #FF6B6B;box-shadow:0 3px 10px rgba(0,0,0,.05);}
.stage-container:nth-child(2) .stage-description{border-left-color:#4ECDC4;}
.stage-container:nth-child(3) .stage-description{border-left-color:#FFD93D;}
.levels-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;margin-top:2rem;}
.level-card{background:#fff;padding:2rem;border-radius:20px;border:3px solid;transition:all .3s;box-shadow:0 5px 15px rgba(0,0,0,.08);}
.stage-container:nth-child(1) .level-card:nth-child(1){border-color:#FFB8B8;background:linear-gradient(to bottom,#fff,#FFF0F0);}
.stage-container:nth-child(1) .level-card:nth-child(2){border-color:#FFA0A0;background:linear-gradient(to bottom,#fff,#FFE5E5);}
.stage-container:nth-child(1) .level-card:nth-child(3){border-color:#FF8888;background:linear-gradient(to bottom,#fff,#FFD8D8);}
.stage-container:nth-child(2) .level-card:nth-child(1){border-color:#B8E6E0;background:linear-gradient(to bottom,#fff,#F0FAF8);}
.stage-container:nth-child(2) .level-card:nth-child(2){border-color:#A0DDD5;background:linear-gradient(to bottom,#fff,#E5F7F5);}
.stage-container:nth-child(2) .level-card:nth-child(3){border-color:#88D4CA;background:linear-gradient(to bottom,#fff,#D8F2EF);}
.stage-container:nth-child(3) .level-card:nth-child(1){border-color:#FFE8A0;background:linear-gradient(to bottom,#fff,#FFFBF0);}
.stage-container:nth-child(3) .level-card:nth-child(2){border-color:#FFE088;background:linear-gradient(to bottom,#fff,#FFF8E5);}
.stage-container:nth-child(3) .level-card:nth-child(3){border-color:#FFD970;background:linear-gradient(to bottom,#fff,#FFF5D8);}
.level-card:hover{transform:translateY(-5px) scale(1.02);box-shadow:0 10px 30px rgba(0,0,0,.15);}
.level-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;}
.level-icon{
  width:50px;height:50px;background:linear-gradient(135deg,#FF6B6B 0%,#FF8E53 100%);border-radius:12px;
  display:flex;align-items:center;justify-content:center;font-size:1.5rem;box-shadow:0 3px 10px rgba(255,107,107,.3);
}
.stage-container:nth-child(2) .level-icon{background:linear-gradient(135deg,#4ECDC4 0%,#38EF7D 100%);}
.stage-container:nth-child(3) .level-icon{background:linear-gradient(135deg,#FFD93D 0%,#FFA500 100%);}
.level-title{flex:1;}
.level-title h4{font-size:1.3rem;color:#2c3e50;margin-bottom:.2rem;font-weight:700;}
.level-age{font-size:.9rem;color:#7f8c8d;font-weight:600;}
.level-features{list-style:none;margin-top:1rem;}
.level-features li{padding:.5rem 0 .5rem 1.8rem;position:relative;color:#555;font-size:.95rem;}
.level-features li::before{content:'🌟';position:absolute;left:0;font-weight:bold;}

/* Módulo familia */
.family-module{
  background:linear-gradient(135deg,#FF6B6B 0%,#4ECDC4 50%,#FFE66D 100%);
  background-size:400% 400%;color:#fff;padding:100px 2rem;position:relative;overflow:hidden;animation:gradientShift 8s ease infinite;
}
.family-module::before{
  content:'👨‍👩‍👧‍👦💖🏠✨👨‍👩‍👧‍👦💖🏠✨👨‍👩‍👧‍👦💖🏠✨👨‍👩‍👧‍👦💖🏠✨👨‍👩‍👧‍👦💖🏠✨👨‍👩‍👧‍👦💖🏠✨';
  position:absolute;
  font-size:4rem;
  bottom:10%;
  right:-10%;
  width:120%;
  animation:floatStars 20s linear infinite;
  opacity:.28;
  white-space:nowrap;
}
.family-content{max-width:1100px;margin:0 auto;position:relative;z-index:1;}
.family-intro{text-align:center;margin-bottom:4rem;}
.family-intro h2{font-size:3rem;margin-bottom:1rem;text-shadow:3px 3px 6px rgba(0,0,0,.3);}
.family-intro p{font-size:1.3rem;opacity:.95;max-width:700px;margin:0 auto;text-shadow:2px 2px 4px rgba(0,0,0,.2);}
.family-features{
  display:grid;
  grid-template-columns:repeat(4, minmax(260px, 1fr));
  gap:2.5rem;
  margin-top:3rem;
  align-items:stretch;
}

.family-feature{
  display:flex;
  flex-direction:column;
  gap:1rem;
  padding:2rem 2rem 2.2rem;
  border-radius:26px;
  /* glass + borde suave */
  background:rgba(255,255,255,.22);
  border:3px solid rgba(255,255,255,.35);
  backdrop-filter:blur(10px);
  -webkit-backdrop-filter:blur(10px);
  /* sombra y suavizado como la maqueta */
  box-shadow:
    0 18px 40px rgba(0,0,0,.18),
    inset 0 1px 0 rgba(255,255,255,.25);
  min-height:420px;            /* misma altura visual */
}

.family-feature:hover{background:rgba(255,255,255,.35);transform:translateY(-8px);box-shadow:0 10px 30px rgba(0,0,0,.2);}
.family-feature-icon{
  font-size:3rem;              /* 48px aprox */
  line-height:1;
  margin-bottom:.25rem;
}
.family-feature h3{
  color:#fff;
  font-weight:800;
  font-size:1.55rem;
  line-height:1.25;
  text-shadow:0 2px 6px rgba(0,0,0,.25);
}

.family-feature p{
  color:rgba(255,255,255,.95);
  font-weight:600;
  line-height:1.7;
  font-size:1.05rem;
}
/* Stats */
.stats-section{background:linear-gradient(135deg,#2c3e50 0%,#34495e 100%);color:#fff;padding:80px 2rem;}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:3rem;max-width:1200px;margin:0 auto;text-align:center;}
.stat-item{padding:2rem;background:rgba(255,255,255,.1);border-radius:20px;backdrop-filter:blur(10px);border:2px solid rgba(255,255,255,.2);transition:all .3s;}
.stat-item:hover{transform:translateY(-5px) scale(1.05);background:rgba(255,255,255,.15);box-shadow:0 10px 30px rgba(255,107,107,.3);}
.stat-item h3{
  font-size:4rem;margin-bottom:.5rem;
  background:linear-gradient(135deg,#FFD93D 0%,#FF6B6B 50%,#4ECDC4 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:900;animation:numberGlow 2s ease-in-out infinite;
}
.stat-item p{font-size:1.1rem;opacity:.9;font-weight:600;}

/* CTA */
.cta-section{padding:100px 2rem;text-align:center;background:linear-gradient(to bottom,#FFF9F0 0%,#FFE8CC 100%);}
.cta-content{max-width:700px;margin:0 auto;}
.cta-content h2{
  font-size:2.5rem;margin-bottom:1.5rem;
  background:linear-gradient(135deg,#FF6B6B 0%,#4ECDC4 50%,#FFE66D 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:900;
}
.cta-content p{font-size:1.2rem;color:#7f8c8d;margin-bottom:2rem;}
.cta-accent{font-size:1.5rem;background:linear-gradient(135deg,#FF6B6B 0%,#4ECDC4 50%,#FFE66D 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:900;margin:1.5rem 0;}

/* Animaciones */
@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes floatStars{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes wiggle{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
@keyframes spin{0%,100%{transform:rotate(0)}50%{transform:rotate(180deg)}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes gradientMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes borderGlow{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes numberPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes numberGlow{0%,100%{filter:brightness(1)}50%{filter:brightness(1.3)}}

/* Responsive */
@media (max-width:768px){
  .hero h1{font-size:2.2rem}
  .subtitle{font-size:1.1rem}
  .hero{padding:84px 1rem 64px}
  .section-title{font-size:2rem}
  .stage-header{flex-direction:column;text-align:center}
  .stage-info h3{font-size:1.8rem}
  .levels-grid{grid-template-columns:1fr}
  .hero-features{gap:1.5rem}
  .family-intro h2{font-size:2rem}
  .stat-item h3{font-size:3rem}
}

#inicio, #caracteristicas, #etapas, #familia {
  scroll-margin-top: 90px; /* Ajusta según la altura de tu header */
}
html {
  scroll-behavior: smooth;
}

</style>
