/* STUDY PAGLA Service Worker: Web Push */
self.addEventListener("push", function(event) {
  var data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) {}
  var title = data.title || "STUDY PAGLA";
  var options = {
    body: data.body || "তোমার নতুন Notification এসেছে",
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    tag: data.tag || "study-pagla-notification",
    renotify: true,
    data: { url: data.url || "./" }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  var target = new URL((event.notification.data && event.notification.data.url) || "./", self.location.origin).href;
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].url.indexOf(self.location.origin) === 0) {
          return list[i].focus();
        }
      }
      return clients.openWindow(target);
    })
  );
});
