try {
  const isMobile = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent)
  if(isMobile && window.location.pathname == '/'){
    window.location.pathname = 'mbIndex'
  }
  if (!isMobile && window.location.pathname == '/mbIndex'){
    window.location.pathname = '/'
  }
} catch (_) {}