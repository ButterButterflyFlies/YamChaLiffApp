<template>
  <div class="wrapper">
    <div class="wrapper__content">
      <div class="like">&#10084;</div>
      <div class="cup-body"></div>
      <div class="cup-body-shadow"></div>
      <div class="cup-body-shadow-bottom"></div>
      <div class="cup-label"></div>
      <div class="cup-label-red">
        <div class="cup-label-red-shadow"></div>
      </div>
      <div class="face">
        <div class="face-eyes"></div>
        <div class="face-mouth"></div>
        <div class="face-blush"></div>
      </div>
      <div class="cup-upper">
        <div class="cup-upper-shadow"></div>
      </div>
      <div class="cup-middle"></div>
      <div class="cup-bottom">
        <div class="cup-bottom-shadow"></div>
      </div>
      <div class="floor"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CuteCoffee',
}
</script>

<style lang="stylus" scoped>
@use postcss-nested;
@use postcss-simple-vars;
body {
  margin: 0;
  padding: 0;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9d3c0;
  height: 100vh;

  &__content {
    transform: translate(-100px)
    width: 100vw;
    height: 100vh;
    position: relative;
  }
}
.cup {
  &-body {
    position: absolute;
    width: 241px;
    height: 324px;
    border-radius: 18px;
    background: #4d343f;
    left: 205px;
    top: 179px;

    &:before {
      content: "";
      position: absolute;
      width: 175px;
      height: 308px;
      background: inherit;
      left: -19px;
      top: 0;
      background: inherit;
      transform: skew(7deg, 0deg);
    }

    &:after {
      content: "";
      position: absolute;
      width: 175px;
      height: 308px;
      background: inherit;
      right: -19px;
      top: 0;
      background: inherit;
      transform: skew(-7deg, 0deg);
    }

    &-shadow {
      position: absolute;
      top: 215px;
      left: 176px;
      width: 248px;
      height: 38px;
      border-radius: 0 45px 45px 0;
      background: #5b4049;

      &:after {
        content: "";
        position: absolute;
        width: 50px;
        height: 38px;
        background: inherit;
        left: -2px;
        top: 0;
        background: inherit;
        transform: skew(7deg, 0deg);
      }
    }
    &-shadow-bottom {
      position: absolute;
      top: 457px;
      left: 211px;
      width: 184px;
      height: 46px;
      border-radius: 0 45px 45px 27px;
      background: #5b4049;

      &:after {
        content: "";
        position: absolute;
        width: 50px;
        height: 46px;
        left: -7px;
        top: 0;
        background: inherit;
        transform: skew(7deg, 0deg);
        border-radius: 0 0 0 20px;
      }
    }
  }
  &-label {
    background: #84505b;
    position: absolute;
    width: 264px;
    height: 192px;
    border-radius: 10px;
    left: 193px;
    top: 251px;

    &:before {
      content: "";
      position: absolute;
      width: 175px;
      height: 191px;
      left: -10px;
      top: 0;
      background: inherit;
      transform: skew(7deg, 0deg);
      border-radius: 11px;
    }
    &:after {
      content: "";
      position: absolute;
      width: 175px;
      height: 191px;
      right: -10px;
      top: 0;
      background: inherit;
      transform: skew(-7deg, 0deg);
      border-radius: 11px;
    }
  }
  &-label-red {
    background: #ce605a;
    position: absolute;
    width: 264px;
    height: 145px;
    left: 193px;
    top: 274px;

    &:before {
      content: "";
      position: absolute;
      width: 175px;
      height: 148px;
      left: -10px;
      top: 0;
      background: inherit;
      transform: skew(7deg, 0deg);
    }

    &:after {
      content: "";
      position: absolute;
      width: 175px;
      height: 148px;
      right: -10px;
      top: 0;
      background: inherit;
      transform: skew(-7deg, 0deg);
    }

    &-shadow {
      position: absolute;
      top: 27px;
      left: -2px;
      width: 230px;
      height: 120px;
      border-radius: 0 111px 183px 33px;
      z-index: 1;
      transform: skew(0deg, -1deg);
      background: #dd6c65;

      &:after {
        content: "";
        position: absolute;
        width: 50px;
        height: 120px;
        left: -6px;
        top: 0;
        background: inherit;
        transform: skew(7deg, 0deg);
        border-radius: 0 0 0;
      }
    }
  }
  &-upper {
    background: #784451;
    position: absolute;
    top: 108px;
    left: 388px;
    height: 25px;
    width: 52px;
    border-radius: 7px 10px 0 0;

    &:before {
      content: "";
      border-bottom: 22px solid #784451;
      border-right: 9px solid transparent;
      position: absolute;
      right: -7px;
      top: 3px;
    }

    &:after {
      content: "";
      border-bottom: 25px solid #84505b;
      border-left: 51px solid transparent;
      position: absolute;
      left: -47px;
      top: 0px;
    }

    &-shadow {
      position: absolute;
      top: 1px;
      left: -14px;
      width: 35px;
      height: 23px;
      border-radius: 100%;
      transform: skew(0deg, -15deg) rotate(2deg);
      background: #84505b;
    }
  }

  &-middle {
    background: #955c6b;
    position: absolute;
    top: 133px;
    left: 187px;
    height: 27px;
    width: 279px;
    border-radius: 12px 12px 0 0;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      width: 186px;
      height: 16px;
      background: #9c6471;
      bottom: 0;
      border-radius: 0 20px 20px 0;
    }
  }
  &-bottom {
    background: #784451;
    position: absolute;
    top: 160px;
    left: 166px;
    height: 41px;
    width: 324px;
    border-radius: 12px;

    &:before {
      content: "";
      position: absolute;
      left: -4px;
      width: 40px;
      height: 41px;
      background: inherit;
      bottom: 0;
      border-radius: 12px;
      transform: skew(-20deg, 0deg);
    }

    &:after {
      content: "";
      position: absolute;
      right: -4px;
      width: 40px;
      height: 41px;
      background: inherit;
      bottom: 0;
      border-radius: 12px;
      transform: skew(20deg, 0deg);
    }

    &-shadow {
      position: absolute;
      bottom: 0;
      left: 1px;
      width: 231px;
      height: 29px;
      border-radius: 0 19px 19px 0;
      background: #84505b;
      z-index: 1;

      &:after {
        content: "";
        position: absolute;
        left: -7px;
        width: 40px;
        height: 29px;
        background: #84505b;
        bottom: 0;
        border-radius: 0 0 0 12px;
        transform: skew(-24deg, 0deg);
        z-index: 1;
      }
    }
  }
}
.floor {
  position: absolute;
  top: 500px;
  left: 114px;
  width: 391px;
  height: 6px;

  &:before,
  &:after {
    content: "";
    top: 0;
    bottom: 0;
    border-radius: 6px;
    background: #4d343f;
    position: absolute;
  }

  &:before {
    width: 33px;
    left: 0;
  }

  &:after {
    width: 350px;
    right: 0;
  }
}
.face {
  position: absolute;
  left: 241px;
  top: 300px;
  width: 172px;
  height: 96px;

  &-eyes {
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 100%;
    background: #5d4048;
    position: absolute;
    z-index: 1;
    left: 41px;
    top: 32px;
    animation: eyes 5s infinite;

    &:before {
      content: "";
      width: 13px;
      height: 13px;
      border-radius: 100%;
      background: #5d4048;
      position: absolute;
      z-index: 1;
      left: 81px;
      top: 0px;
    }
  }
  &-mouth {
    width: 8px;
    height: 9px;
    border-radius: 100%;
    border: 3px solid #5d4048;
    position: absolute;
    z-index: 1;
    left: 75px;
    top: 48px;
    animation: mouth 5s infinite;

    &:after {
      content: "";
      position: absolute;
      left: -4px;
      width: 27px;
      height: 9px;
      background: #dd6c65;
      z-index: 1;
      top: -6px;
    }
    &:before {
      width: 8px;
      height: 9px;
      border-radius: 100%;
      border: 3px solid #5d4048;
      position: absolute;
      z-index: 1;
      left: 8px;
      top: -3px;
      content: "";
    }
  }
  &-blush {
    position: absolute;
    width: 48px;
    height: 19px;
    background: radial-gradient(#ff7ec6 0%, transparent 50%);
    left: 10px;
    top: 36px;
    border-radius: 100%;
    z-index: 2;
    animation: blush 5s infinite;

    &:after {
      content: "";
      position: absolute;
      width: 48px;
      height: 19px;
      background: inherit;
      left: 104px;
      top: 0;
      border-radius: 100%;
      z-index: 2;
    }
  }
}
.like {
  position: absolute;
  background: #dc6d64;
  width: 161px;
  height: 55px;
  border-radius: 9px;
  left: 243px;
  top: 18px;
  color: #f3d4bf;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 41px;
  animation: heart 3.5s infinite;

  &:before {
    content: "";
    position: absolute;
    height: 50px;
    left: 63px;
    top: 50px;
    border-left: 17px solid transparent;
    border-right: 17px solid transparent;
    border-top: 20px solid #dc6d64;
  }
}

@keyframes eyes {
  0%,
  80% {
    transform: translate(0px, 0px) scale(1, 1);
  }
  24%,
  60% {
    transform: translate(-3px, -11px) scale(1.05, 0.5);
  }
}
@keyframes mouth {
  0%,
  80% {
    transform: translate(0px, 0px) scale(1, 1);
  }
  15%,
  55% {
    transform: translate(-1px, -15px) scale(1.1, 0.9);
  }
}
@keyframes blush {
  0%,
  20%,
  75%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 0.4;
  }
}
@keyframes heart {
  0%,
  13%,
  23%,
  100% {
    font-size: 41px;
  }
  1% {
    font-size: 50px;
  }
  17% {
    font-size: 55px;
  }
}
</style>