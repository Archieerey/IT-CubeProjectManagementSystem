Создание ролей --- POST
http://localhost:3015/build

Создание админа 
http://localhost:3015/auth/register
{
    "name":"Админ",
    "email":"admin@example.com",
    "password":"Password123$",
    "telephone":"+79879879887",
    "role":""
}

Создание жанра --- POST
http://localhost:3015/admin/genre/create
{
    "title":"Джаз"
}

Создание музыканта --- POST
http://localhost:3015/auth/register
{
    "name":"Музыкант",
    "email":"artist@example.com",
    "password":"Password123$",
    "telephone":"+79879879888",
    "role":""
}

Создание пластинки --- POST
http://localhost:3015/artist/record
{
    "title":"Динар",
    "price":"1500 руб.",
    "genre_id":""
}

Изменение пластинки --- PATCH
http://localhost:3015/artist/record:id
{
    "title":"Динар Изменён",
    "price":"3000 руб.",
    "genre_id":"676253782faf3282f65e5f78"
}

Изменение изображения пластинки --- PATCH
http://localhost:3015/artist/record/cover/:id
{
    track_cover: track_coverPath
}

Создание клиента --- POST
http://localhost:3015/auth/register
{
    "name":"Клиент",
    "email":"user@example.com",
    "password":"Password123$",
    "telephone":"+79878766554"
}

Обновление клиента --- PATCH
http://localhost:3015/account/change
{
    "newName":"Клиент Клиент",
    "newPassword":"newPassword123$",
    "newTelephone":"+79172484920"
}

Загрузка аватарки --- PATCH
http://localhost:3015/client/account/avatar
{
    avatar: avatarPath
}

Добавление в корзину
http://localhost:3015/client/cart/add/:id/:quantity

Создание заказа
http://localhost:3015/client/order

Логин админа --- POST
http://localhost:3015/auth/login
{
    "email":"admin@example.com",
    "password":"Password123$"
}

Принятие заказа --- PATCH
http://localhost:3015/admin/order/accept/:id

Отказ от заказа --- PATCH
http://localhost:3015/admin/order/reject/:id

Логин музыканта --- POST
http://localhost:3015/auth/login
{
    "email":"artist@example.com",
    "password":"Password123$"
}

Логин клиента --- POST
http://localhost:3015/auth/login
{
    "email":"user@example.com",
    "password":"Password123$"
}

Удаление клиента --- DELETE
http://localhost:3015/admin/client/ban/:id
 
Поиск по названию
http://localhost:3015/client/search/records?title=

Поиск по имени
http://localhost:3015/client/search/artist?artist=

Поиск по жанру
http://localhost:3015/client/search/genre?genre=