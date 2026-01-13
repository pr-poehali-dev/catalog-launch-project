import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface FinancialProduct {
  id: number;
  title: string;
  type: 'debit' | 'credit' | 'loan' | 'microloan' | 'subscription';
  rate: number;
  description: string;
  features: string[];
  bank: string;
  badge?: string;
}

const products: FinancialProduct[] = [
  {
    id: 1,
    title: 'Дебетовая карта Премиум',
    type: 'debit',
    rate: 7.5,
    description: 'Карта с высоким кэшбэком и бесплатным обслуживанием',
    features: ['До 7.5% на остаток', 'Кэшбэк 5%', 'Бесплатное обслуживание'],
    bank: 'Альфа-Банк',
    badge: 'Популярное'
  },
  {
    id: 2,
    title: 'Кредитная карта Gold',
    type: 'credit',
    rate: 19.9,
    description: 'Кредитная карта с длинным льготным периодом',
    features: ['120 дней без %', 'Лимит до 500 000 ₽', 'Кэшбэк 3%'],
    bank: 'Тинькофф',
    badge: 'Выгодно'
  },
  {
    id: 3,
    title: 'Потребительский кредит',
    type: 'loan',
    rate: 12.5,
    description: 'Кредит наличными на любые цели',
    features: ['До 3 000 000 ₽', 'Срок до 7 лет', 'Без справок'],
    bank: 'Сбербанк'
  },
  {
    id: 4,
    title: 'Быстрый микрозайм',
    type: 'microloan',
    rate: 1.5,
    description: 'Деньги на карту за 15 минут',
    features: ['До 30 000 ₽', 'Без проверки КИ', 'Онлайн оформление'],
    bank: 'МигКредит'
  },
  {
    id: 5,
    title: 'Подписка Плюс',
    type: 'subscription',
    rate: 299,
    description: 'Музыка, видео и кэшбэк в одной подписке',
    features: ['Музыка без рекламы', 'Кэшбэк 5%', 'Скидки у партнёров'],
    bank: 'Яндекс Плюс'
  },
  {
    id: 6,
    title: 'Дебетовая карта Классик',
    type: 'debit',
    rate: 5.0,
    description: 'Простая карта для повседневных покупок',
    features: ['До 5% на остаток', 'Кэшбэк 2%', 'Без комиссий'],
    bank: 'ВТБ'
  },
  {
    id: 7,
    title: 'Кредитная карта Travel',
    type: 'credit',
    rate: 22.9,
    features: ['100 дней без %', 'Мили за покупки', 'Без комиссий за границей'],
    description: 'Идеальная карта для путешественников',
    bank: 'Райффайзен'
  },
  {
    id: 8,
    title: 'Ипотечный кредит',
    type: 'loan',
    rate: 8.9,
    description: 'Выгодная ипотека на новостройки',
    features: ['От 8.9% годовых', 'До 30 лет', 'Господдержка'],
    bank: 'ДОМ.РФ',
    badge: 'Лучшая ставка'
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxRate, setMaxRate] = useState([50]);

  const typeLabels: Record<string, string> = {
    all: 'Все продукты',
    debit: 'Дебетовые карты',
    credit: 'Кредитные карты',
    loan: 'Кредиты',
    microloan: 'Микрозаймы',
    subscription: 'Подписки'
  };

  const typeIcons: Record<string, string> = {
    debit: 'CreditCard',
    credit: 'Wallet',
    loan: 'Landmark',
    microloan: 'Coins',
    subscription: 'Sparkles'
  };

  const filteredProducts = products.filter(product => {
    const matchesType = filterType === 'all' || product.type === filterType;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.bank.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRate = product.rate <= maxRate[0];
    return matchesType && matchesSearch && matchesRate;
  });

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
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
              <a href="#stores" className="text-sm font-medium hover:text-primary transition-colors">Магазины</a>
              <a href="#cards" className="text-sm font-medium hover:text-primary transition-colors">Карты</a>
              <a href="#loans" className="text-sm font-medium hover:text-primary transition-colors">Кредиты</a>
              <Button className="gradient-purple-pink text-white">Войти</Button>
            </nav>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 gradient-purple-pink text-white border-0">Каталог финансовых продуктов</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Найдите лучшие <span className="text-gradient">финансовые решения</span> для себя
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Сравнивайте предложения от ведущих банков и финансовых организаций. 
              Выбирайте выгодные условия за минуту.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button size="lg" className="gradient-purple-pink text-white" onClick={() => navigate('/application')}>
                <Icon name="Search" className="mr-2" size={18} />
                Найти продукт
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/compare')}>
                <Icon name="TrendingUp" className="mr-2" size={18} />
                Сравнить продукты
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 animate-fade-in-delay" id="catalog">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-xl gradient-purple-pink mx-auto mb-3 flex items-center justify-center">
                  <Icon name="CreditCard" className="text-white" size={24} />
                </div>
                <h3 className="font-semibold mb-1">Дебетовые карты</h3>
                <p className="text-sm text-muted-foreground">До 7.5% на остаток</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-xl gradient-blue-purple mx-auto mb-3 flex items-center justify-center">
                  <Icon name="Wallet" className="text-white" size={24} />
                </div>
                <h3 className="font-semibold mb-1">Кредитные карты</h3>
                <p className="text-sm text-muted-foreground">До 120 дней без %</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 mx-auto mb-3 flex items-center justify-center">
                  <Icon name="Landmark" className="text-white" size={24} />
                </div>
                <h3 className="font-semibold mb-1">Кредиты</h3>
                <p className="text-sm text-muted-foreground">От 8.9% годовых</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 mx-auto mb-3 flex items-center justify-center">
                  <Icon name="Coins" className="text-white" size={24} />
                </div>
                <h3 className="font-semibold mb-1">Микрозаймы</h3>
                <p className="text-sm text-muted-foreground">За 15 минут</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="SlidersHorizontal" size={20} />
                Фильтры
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Тип продукта</label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все продукты</SelectItem>
                      <SelectItem value="debit">Дебетовые карты</SelectItem>
                      <SelectItem value="credit">Кредитные карты</SelectItem>
                      <SelectItem value="loan">Кредиты</SelectItem>
                      <SelectItem value="microloan">Микрозаймы</SelectItem>
                      <SelectItem value="subscription">Подписки</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Поиск</label>
                  <Input
                    placeholder="Название или банк..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Максимальная ставка: {maxRate[0]}%
                  </label>
                  <Slider
                    value={maxRate}
                    onValueChange={setMaxRate}
                    max={50}
                    min={0}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold">
              {typeLabels[filterType]} 
              <span className="text-muted-foreground text-lg ml-2">({filteredProducts.length})</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <Card key={product.id} className="card-hover" style={{animationDelay: `${index * 100}ms`}}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 rounded-xl gradient-purple-pink flex items-center justify-center">
                      <Icon name={typeIcons[product.type]} className="text-white" size={20} />
                    </div>
                    {product.badge && (
                      <Badge variant="secondary" className="gradient-blue-purple text-white border-0">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                  <CardDescription>{product.bank}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-gradient">{product.rate}%</span>
                      <span className="text-sm text-muted-foreground">
                        {product.type === 'subscription' ? '/мес' : 'годовых'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full gradient-purple-pink text-white" onClick={() => navigate('/application')}>
                    Оформить заявку
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">Попробуйте изменить параметры фильтров</p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-purple-pink flex items-center justify-center">
                  <Icon name="Sparkles" className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold">FinMarket</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Каталог финансовых продуктов и услуг
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Продукты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Дебетовые карты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Кредитные карты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Кредиты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Микрозаймы</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Политика</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 FinMarket. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;