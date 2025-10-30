import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Flower {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface CartItem extends Flower {
  quantity: number;
}

const flowers: Flower[] = [
  {
    id: 1,
    name: 'Розовый рассвет',
    price: 2500,
    image: 'https://cdn.poehali.dev/projects/2c50adb4-8910-45da-953a-e6def677d90d/files/1e5b0e27-d8c5-4952-b70d-75cc23920ac0.jpg',
    category: 'Розы',
    description: 'Нежный букет из розовых роз'
  },
  {
    id: 2,
    name: 'Лавандовая мечта',
    price: 3200,
    image: 'https://cdn.poehali.dev/projects/2c50adb4-8910-45da-953a-e6def677d90d/files/a9df0bb4-6ff8-4ae2-bdbc-9f3a936ec320.jpg',
    category: 'Тюльпаны',
    description: 'Весенний букет фиолетовых тюльпанов'
  },
  {
    id: 3,
    name: 'Солнечное настроение',
    price: 2800,
    image: 'https://cdn.poehali.dev/projects/2c50adb4-8910-45da-953a-e6def677d90d/files/47ad9243-fb5e-4777-b4ae-dac8770563aa.jpg',
    category: 'Подсолнухи',
    description: 'Яркие подсолнухи для позитива'
  },
  {
    id: 4,
    name: 'Романтика',
    price: 4500,
    image: 'https://cdn.poehali.dev/projects/2c50adb4-8910-45da-953a-e6def677d90d/files/1e5b0e27-d8c5-4952-b70d-75cc23920ac0.jpg',
    category: 'Розы',
    description: 'Элегантный букет красных роз'
  },
  {
    id: 5,
    name: 'Весенняя свежесть',
    price: 2900,
    image: 'https://cdn.poehali.dev/projects/2c50adb4-8910-45da-953a-e6def677d90d/files/a9df0bb4-6ff8-4ae2-bdbc-9f3a936ec320.jpg',
    category: 'Тюльпаны',
    description: 'Микс весенних тюльпанов'
  },
  {
    id: 6,
    name: 'Летний день',
    price: 3100,
    image: 'https://cdn.poehali.dev/projects/2c50adb4-8910-45da-953a-e6def677d90d/files/47ad9243-fb5e-4777-b4ae-dac8770563aa.jpg',
    category: 'Подсолнухи',
    description: 'Большой букет подсолнухов'
  }
];

const reviews = [
  { id: 1, name: 'Анна С.', text: 'Потрясающие цветы! Доставили точно в срок, букет был свежий и красивый. Спасибо!', rating: 5 },
  { id: 2, name: 'Михаил К.', text: 'Заказывал на день рождения жены. Она в восторге! Рекомендую всем.', rating: 5 },
  { id: 3, name: 'Елена В.', text: 'Отличный сервис, вежливые курьеры. Цветы простояли больше недели.', rating: 5 }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    cardText: ''
  });

  const categories = ['Все', 'Розы', 'Тюльпаны', 'Подсолнухи'];

  const filteredFlowers = selectedCategory === 'Все' 
    ? flowers 
    : flowers.filter(f => f.category === selectedCategory);

  const addToCart = (flower: Flower) => {
    const existing = cart.find(item => item.id === flower.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === flower.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...flower, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Icon name="Flower2" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Цветочный рай
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#catalog" className="hover:text-primary transition-colors font-medium">Каталог</a>
            <a href="#delivery" className="hover:text-primary transition-colors font-medium">Доставка</a>
            <a href="#reviews" className="hover:text-primary transition-colors font-medium">Отзывы</a>
            <a href="#contacts" className="hover:text-primary transition-colors font-medium">Контакты</a>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <Card key={item.id}>
                        <CardContent className="p-4 flex gap-4">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button 
                                size="icon" 
                                variant="outline" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                size="icon" 
                                variant="outline" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8 ml-auto"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Итого:</span>
                        <span className="text-2xl font-bold text-primary">{totalPrice} ₽</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" size="lg">
                            Оформить заказ
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Оформление заказа</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div>
                              <label className="text-sm font-medium">Имя</label>
                              <Input 
                                placeholder="Ваше имя" 
                                value={orderForm.name}
                                onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Телефон</label>
                              <Input 
                                placeholder="+7 (999) 123-45-67" 
                                value={orderForm.phone}
                                onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Адрес доставки</label>
                              <Input 
                                placeholder="Улица, дом, квартира" 
                                value={orderForm.address}
                                onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Текст открытки (необязательно)</label>
                              <Textarea 
                                placeholder="Напишите поздравление или пожелание..." 
                                value={orderForm.cardText}
                                onChange={(e) => setOrderForm({...orderForm, cardText: e.target.value})}
                                rows={3}
                              />
                            </div>
                            <Button className="w-full" size="lg">
                              Подтвердить заказ на {totalPrice} ₽
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Свежие цветы с доставкой
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Создайте незабываемый момент с нашими яркими букетами. Бесплатная персональная открытка к каждому заказу!
            </p>
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="Sparkles" className="mr-2" size={20} />
              Посмотреть каталог
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12">Наши букеты</h3>
          
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
                className="transition-all"
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFlowers.map((flower, idx) => (
              <Card 
                key={flower.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={flower.image} 
                    alt={flower.name} 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-primary">
                    {flower.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-2">{flower.name}</h4>
                  <p className="text-muted-foreground mb-4">{flower.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{flower.price} ₽</span>
                    <Button onClick={() => addToCart(flower)} className="gap-2">
                      <Icon name="ShoppingCart" size={18} />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12">Доставка</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" className="text-white" size={32} />
              </div>
              <h4 className="font-bold text-xl mb-2">Быстро</h4>
              <p className="text-muted-foreground">Доставка в течение 2-3 часов по городу</p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" className="text-white" size={32} />
              </div>
              <h4 className="font-bold text-xl mb-2">Бережно</h4>
              <p className="text-muted-foreground">Специальная упаковка для сохранности</p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Gift" className="text-white" size={32} />
              </div>
              <h4 className="font-bold text-xl mb-2">С открыткой</h4>
              <p className="text-muted-foreground">Бесплатная персональная открытка</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12">Отзывы клиентов</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map(review => (
              <Card key={review.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" className="text-yellow-400 fill-yellow-400" size={18} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                <p className="font-semibold">{review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12">Контакты</h3>
          <Card className="max-w-2xl mx-auto p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Icon name="Phone" className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Телефон</p>
                  <p className="text-lg font-semibold">+7 (999) 123-45-67</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                  <Icon name="Mail" className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-lg font-semibold">info@flowers-paradise.ru</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                  <Icon name="MapPin" className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Адрес</p>
                  <p className="text-lg font-semibold">г. Москва, ул. Цветочная, д. 1</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Icon name="Flower2" className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Цветочный рай
            </span>
          </div>
          <p className="text-muted-foreground">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}
