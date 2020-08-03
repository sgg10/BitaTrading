const showToast = (obj, title, msg, variant, autoHideDelay = 5000) => obj.toast(msg, { title, autoHideDelay, variant })
export { showToast }
