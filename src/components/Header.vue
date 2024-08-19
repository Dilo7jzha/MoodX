<template>
    <!-- Using Bootstrap's Header template (starter code) -->
    <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
    <div class="container">
      <header class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a href="#" class="nav-link active" aria-current="page">MoodX</a>
          </li>
          <li class="nav-item"><a href="#" class="nav-link">Get help</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Get involved</a></li>
          <li class="nav-item"><a href="#" class="nav-link">About us</a></li>
        </ul>
      </header>
    </div>
  </template>
  
  <style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
  </style>