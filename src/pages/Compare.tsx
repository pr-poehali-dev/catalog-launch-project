import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  type: string;
  rate: number;
  bank: string;
  features: string[];
  cashback?: string;
  limit?: string;
  period?: string;
  minAmount?: string;
  maxAmount?: string;
}

const compareProducts: Product[] = [
  {
    id: 1,
    title: 'Дебетовая карта Премиум',
    type: 'debit',
    rate: 7.5,
    bank: 'Альфа-Банк',
    cashback: '5%',
    features: ['До 7.5% на остаток', 'Кэшбэк 5%', 'Бесплатное обслуживание', 'Снятие без комиссии'],
    limit: 'Безлимит'
  },
  {
    id: 2,
    title: 'Кредитная карта Gold',
    type: 'credit',
    rate: 19.9,
    bank: 'Тинькофф',
    cashback: '3%',
    period: '120 дней',
    limit: 'До 500 000 ₽',
    features: ['120 дней без %', 'Лимит до 500 000 ₽', 'Кэшбэк 3%', 'Бесплатная доставка']
  },
  {
    id: 3,
    title: 'Потребительский кредит',
    type: 'loan',
    rate: 12.5,
    bank: 'Сбербанк',
    minAmount: '50 000 ₽',
    maxAmount: '3 000 000 ₽',
    period: 'До 7 лет',
    features: ['До 3 000 000 ₽', 'Срок до 7 лет', 'Без справок', 'Быстрое одобрение']
  }
];

const Compare = () => {
  const navigate = useNavigate();
  const [selectedProducts] = useState(compareProducts);

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
              <Button variant="ghost" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" className="mr-2" size={16} />
                Назад к каталогу
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-12 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-4 gradient-purple-pink text-white border-0">Сравнение</Badge>
              <h2 className="text-4xl font-bold mb-4">
                Сравните <span className="text-gradient">продукты</span>
              </h2>
              <p className="text-muted-foreground">
                Детальное сравнение условий и преимуществ финансовых продуктов
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="inline-flex gap-6 pb-4">
                {selectedProducts.map((product) => (
                  <Card key={product.id} className="w-80 flex-shrink-0 card-hover">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 rounded-2xl gradient-purple-pink mx-auto mb-4 flex items-center justify-center">
                        <Icon name="CreditCard" className="text-white" size={28} />
                      </div>
                      <CardTitle className="text-xl mb-2">{product.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{product.bank}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6 text-center">
                        <div className="text-4xl font-bold text-gradient mb-1">{product.rate}%</div>
                        <div className="text-sm text-muted-foreground">
                          {product.type === 'debit' ? 'на остаток' : 'годовых'}
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        {product.cashback && (
                          <div className="flex items-center justify-between py-3 border-b">
                            <span className="text-sm text-muted-foreground">Кэшбэк</span>
                            <span className="font-semibold">{product.cashback}</span>
                          </div>
                        )}
                        
                        {product.period && (
                          <div className="flex items-center justify-between py-3 border-b">
                            <span className="text-sm text-muted-foreground">
                              {product.type === 'credit' ? 'Льготный период' : 'Срок кредита'}
                            </span>
                            <span className="font-semibold">{product.period}</span>
                          </div>
                        )}
                        
                        {product.limit && (
                          <div className="flex items-center justify-between py-3 border-b">
                            <span className="text-sm text-muted-foreground">Лимит</span>
                            <span className="font-semibold">{product.limit}</span>
                          </div>
                        )}
                        
                        {product.minAmount && (
                          <div className="flex items-center justify-between py-3 border-b">
                            <span className="text-sm text-muted-foreground">Минимум</span>
                            <span className="font-semibold">{product.minAmount}</span>
                          </div>
                        )}
                        
                        {product.maxAmount && (
                          <div className="flex items-center justify-between py-3 border-b">
                            <span className="text-sm text-muted-foreground">Максимум</span>
                            <span className="font-semibold">{product.maxAmount}</span>
                          </div>
                        )}
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Icon name="CheckCircle2" size={16} className="text-primary" />
                          Преимущества
                        </h4>
                        <ul className="space-y-2">
                          {product.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <Icon name="Check" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full gradient-purple-pink text-white">
                        Оформить заявку
                        <Icon name="ArrowRight" className="ml-2" size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} className="text-primary" />
                    Рекомендация
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Для максимального кэшбэка и высокого процента на остаток мы рекомендуем 
                    <span className="font-semibold text-foreground"> Дебетовую карту Премиум</span> 
                    от Альфа-Банка.
                  </p>
                  <Button variant="outline" className="w-full">
                    Узнать подробнее
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Info" size={20} className="text-primary" />
                    Важно знать
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="AlertCircle" size={16} className="flex-shrink-0 mt-0.5" />
                      <span>Проверьте актуальность условий на сайте банка</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="AlertCircle" size={16} className="flex-shrink-0 mt-0.5" />
                      <span>Итоговые условия зависят от вашей кредитной истории</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Compare;
