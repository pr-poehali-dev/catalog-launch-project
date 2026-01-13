import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  productId: number;
  productName: string;
  productType: string;
  bank: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  pros: string[];
  cons: string[];
  helpful: number;
}

const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    productName: 'Дебетовая карта Премиум',
    productType: 'debit',
    bank: 'Альфа-Банк',
    author: 'Мария К.',
    rating: 5,
    date: '15 января 2026',
    text: 'Отличная карта! Пользуюсь уже полгода, очень довольна. Кэшбэк приходит вовремя, процент на остаток действительно 7.5%. Обслуживание бесплатное, как и обещали.',
    pros: ['Высокий кэшбэк', 'Бесплатное обслуживание', 'Удобное приложение'],
    cons: ['Долгая доставка карты'],
    helpful: 24
  },
  {
    id: 2,
    productId: 2,
    productName: 'Кредитная карта Gold',
    productType: 'credit',
    bank: 'Тинькофф',
    author: 'Александр П.',
    rating: 5,
    date: '10 января 2026',
    text: 'Лучшая кредитная карта, которой я пользовался. 120 дней без процентов — это реально работает. Успеваю погасить и не плачу ничего сверху.',
    pros: ['Длинный льготный период', 'Быстрое одобрение', 'Хороший кэшбэк'],
    cons: [],
    helpful: 31
  },
  {
    id: 3,
    productId: 3,
    productName: 'Потребительский кредит',
    productType: 'loan',
    bank: 'Сбербанк',
    author: 'Дмитрий С.',
    rating: 4,
    date: '8 января 2026',
    text: 'Взял кредит на ремонт квартиры. Одобрили быстро, деньги пришли в течение часа. Ставка 12.5% — приемлемо. Удобно платить через приложение.',
    pros: ['Быстрое одобрение', 'Деньги сразу на карту', 'Понятные условия'],
    cons: ['Нужна справка о доходах для большой суммы'],
    helpful: 18
  },
  {
    id: 4,
    productId: 1,
    productName: 'Дебетовая карта Премиум',
    productType: 'debit',
    bank: 'Альфа-Банк',
    author: 'Елена В.',
    rating: 4,
    date: '5 января 2026',
    text: 'Хорошая карта для повседневных покупок. Кэшбэк действительно возвращается, процент на остаток тоже начисляется. Единственное — карту ждала 2 недели.',
    pros: ['Реальный кэшбэк', 'Без комиссий', 'Процент на остаток'],
    cons: ['Долгая доставка'],
    helpful: 12
  },
  {
    id: 5,
    productId: 2,
    productName: 'Кредитная карта Gold',
    productType: 'credit',
    bank: 'Тинькофф',
    author: 'Игорь М.',
    rating: 5,
    date: '3 января 2026',
    text: 'Пользуюсь год, ни разу не пожалел. Льготный период позволяет покупать без переплат. Приложение очень удобное, всегда вижу остаток и дату платежа.',
    pros: ['120 дней без %', 'Удобное приложение', 'Быстрая поддержка'],
    cons: ['Высокая ставка после льготного периода'],
    helpful: 27
  },
  {
    id: 6,
    productId: 3,
    productName: 'Потребительский кредит',
    productType: 'loan',
    bank: 'Сбербанк',
    author: 'Ольга Н.',
    rating: 5,
    date: '1 января 2026',
    text: 'Взяла кредит на образование ребёнка. Всё оформили онлайн за 10 минут, деньги перевели в этот же день. Очень благодарна банку за оперативность!',
    pros: ['Моментальное одобрение', 'Без визита в офис', 'Низкая ставка'],
    cons: [],
    helpful: 22
  }
];

const productRatings = {
  1: { average: 4.5, total: 156, distribution: { 5: 89, 4: 45, 3: 15, 2: 5, 1: 2 } },
  2: { average: 4.8, total: 203, distribution: { 5: 145, 4: 48, 3: 8, 2: 2, 1: 0 } },
  3: { average: 4.6, total: 124, distribution: { 5: 78, 4: 35, 3: 9, 2: 2, 1: 0 } }
};

const Reviews = () => {
  const navigate = useNavigate();
  const [filterProduct, setFilterProduct] = useState<string>('all');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  let filteredReviews = reviews.filter(review => {
    const matchesProduct = filterProduct === 'all' || review.productId.toString() === filterProduct;
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    return matchesProduct && matchesRating;
  });

  if (sortBy === 'rating') {
    filteredReviews = [...filteredReviews].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'helpful') {
    filteredReviews = [...filteredReviews].sort((a, b) => b.helpful - a.helpful);
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < rating ? 'Star' : 'Star'}
        size={16}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-purple-pink flex items-center justify-center">
                <Icon name="Sparkles" className="text-white" size={20} />
              </div>
              <h1 className="text-2xl font-bold text-gradient">FinMarket</h1>
            </div>
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              Назад к каталогу
            </Button>
          </div>
        </div>
      </header>

      <section className="py-12 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-4 gradient-purple-pink text-white border-0">Отзывы клиентов</Badge>
              <h2 className="text-4xl font-bold mb-4">
                Реальные <span className="text-gradient">отзывы</span> пользователей
              </h2>
              <p className="text-muted-foreground">
                Узнайте мнение клиентов о финансовых продуктах
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="SlidersHorizontal" size={20} />
                      Фильтры и сортировка
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Продукт</label>
                        <Select value={filterProduct} onValueChange={setFilterProduct}>
                          <SelectTrigger>
                            <SelectValue placeholder="Все продукты" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все продукты</SelectItem>
                            <SelectItem value="1">Дебетовая карта Премиум</SelectItem>
                            <SelectItem value="2">Кредитная карта Gold</SelectItem>
                            <SelectItem value="3">Потребительский кредит</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Рейтинг</label>
                        <Select value={filterRating} onValueChange={setFilterRating}>
                          <SelectTrigger>
                            <SelectValue placeholder="Любой рейтинг" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Любой рейтинг</SelectItem>
                            <SelectItem value="5">5 звёзд</SelectItem>
                            <SelectItem value="4">4 звезды</SelectItem>
                            <SelectItem value="3">3 звезды</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Сортировка</label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger>
                            <SelectValue placeholder="По дате" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recent">Сначала новые</SelectItem>
                            <SelectItem value="rating">По рейтингу</SelectItem>
                            <SelectItem value="helpful">По полезности</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {filteredReviews.map((review) => (
                    <Card key={review.id} className="card-hover">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="gradient-purple-pink text-white font-semibold">
                                {review.author.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold">{review.author}</div>
                              <div className="text-sm text-muted-foreground">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex gap-1">{renderStars(review.rating)}</div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Badge variant="outline" className="mb-2">
                            {review.productName} · {review.bank}
                          </Badge>
                          <p className="text-sm leading-relaxed">{review.text}</p>
                        </div>

                        {review.pros.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                              <Icon name="ThumbsUp" size={14} className="text-green-600" />
                              Достоинства
                            </h4>
                            <ul className="space-y-1">
                              {review.pros.map((pro, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <Icon name="Plus" size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {review.cons.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                              <Icon name="ThumbsDown" size={14} className="text-red-600" />
                              Недостатки
                            </h4>
                            <ul className="space-y-1">
                              {review.cons.map((con, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <Icon name="Minus" size={14} className="text-red-600 flex-shrink-0 mt-0.5" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t">
                          <Button variant="ghost" size="sm">
                            <Icon name="ThumbsUp" className="mr-2" size={14} />
                            Полезно ({review.helpful})
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/product/${review.productId}`)}
                          >
                            Перейти к продукту
                            <Icon name="ArrowRight" className="ml-2" size={14} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredReviews.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Нет отзывов</h3>
                    <p className="text-muted-foreground">Попробуйте изменить фильтры</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Рейтинг продуктов</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(productRatings).map(([productId, data]) => {
                      const product = reviews.find(r => r.productId.toString() === productId);
                      if (!product) return null;

                      return (
                        <div key={productId} className="space-y-3">
                          <div 
                            className="cursor-pointer hover:text-primary transition-colors"
                            onClick={() => navigate(`/product/${productId}`)}
                          >
                            <div className="font-semibold">{product.productName}</div>
                            <div className="text-sm text-muted-foreground">{product.bank}</div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="text-3xl font-bold text-gradient">{data.average}</div>
                            <div>
                              <div className="flex gap-0.5">{renderStars(Math.round(data.average))}</div>
                              <div className="text-xs text-muted-foreground">{data.total} отзывов</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((stars) => (
                              <div key={stars} className="flex items-center gap-2 text-xs">
                                <span className="w-8">{stars} ★</span>
                                <Progress 
                                  value={(data.distribution[stars as keyof typeof data.distribution] / data.total) * 100} 
                                  className="flex-1 h-2"
                                />
                                <span className="w-8 text-muted-foreground">
                                  {data.distribution[stars as keyof typeof data.distribution]}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          {productId !== '3' && <div className="border-t pt-3" />}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Оставить отзыв</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Поделитесь своим опытом использования финансовых продуктов
                    </p>
                    <Button className="w-full gradient-purple-pink text-white">
                      <Icon name="MessageSquarePlus" className="mr-2" size={16} />
                      Написать отзыв
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
