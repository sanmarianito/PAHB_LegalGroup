#!/bin/sh
# Avisa a IndexNow (Bing, Yandex, Naver, Seznam, Yep) de URLs nuevas o cambiadas.
# Uso: scripts/indexnow.sh                 -> envía todas las URLs del sitemap
#      scripts/indexnow.sh URL [URL ...]   -> envía solo esas URLs
HOST=pahbabogada.com
KEY=4a6863c10e2d4bee382fdb32ed3a63d8

if [ $# -eq 0 ]; then
  set -- $(curl -s "https://$HOST/sitemap.xml" | sed -n 's:.*<loc>\(.*\)</loc>.*:\1:p')
fi

URLS=$(printf '"%s",' "$@" | sed 's/,$//')
curl -s -o /dev/null -w "IndexNow: HTTP %{http_code}\n" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"https://$HOST/$KEY.txt\",\"urlList\":[$URLS]}" \
  https://api.indexnow.org/indexnow
