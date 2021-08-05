<template>
  <button aria-label="Toggle Theme" class="qr-btn nav-btn m-0 p-0">
    <a class="block" >
      <ic:baseline-qr-code />
    </a>
    <div class="qr-content w-140px">
      <img class="block" src="/qrcode_mand-mobile.github.io.png" />
    </div>
  </button>
</template>

<style>
  .nav-btn a {
    color: var(--c-text);
  }
  .qr-content {
    display: none;
    position: fixed;
    top: var(--header-height);
    padding: 8px;
    transform: translateX(-40%);
    background-color: #fff;
    box-shadow:  0 2px 10px rgba(0, 0, 0, .08) !important;
    border-radius: 8px;
    opacity: 0;
    transition: all .24s;
  }
  .qr-btn:hover .qr-content {
    display: block;
    opacity: 1;
  }
</style>
